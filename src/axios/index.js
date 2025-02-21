import store from "@/store";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_API_BASE_URL_V1, // 기본 URL 경로
  withCredentials: true,
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 토큰이 유효하지 않으면 refresh token으로 재발급
    if ((error.response && error.response.status === 401 && !originalRequest._retry) || error.response.data.error.code === 40101) {
      console.log(error.response);
      
      originalRequest._retry = true;

      // 쿠키에서 리프레시 토큰 가져오기
      const refreshToken = getCookie("RefreshToken");      

      try {
        const res = await instance.post("/api/v1/auth/reissue", {}, {
          headers: {
            RefreshToken: refreshToken // 헤더에 리프레시 토큰을 추가
          },
          withCredentials: true
        });

        if (res.status === 403 || res.status === 40201 || res.status === 40202) { // 리프레시 토큰이 유효하지 않을 경우
          store.dispatch("logout"); // 로그아웃
          return Promise.reject(error.response.data);
        }

        const newAuthorizationHeader = res.headers["authorization"];
        const newAccessToken = newAuthorizationHeader ? newAuthorizationHeader.replace("Bearer ", "") : null;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch("logout");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response ? error.response.data : error);
  }
);

// 쿠키에서 값 가져오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default instance;