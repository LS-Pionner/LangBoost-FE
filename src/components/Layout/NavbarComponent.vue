<template>
  <div class="container">
    <div class="left-container">
      <!-- 'Home' 버튼 추가 -->
      <div class="item">
        <!-- 'Home' 버튼을 클릭하면 '/'로 이동 -->
        <router-link to="/" class="item-link">Home</router-link>
      </div>
      <!-- 'Sentences' 버튼 -->
      <div class="item">
        <!-- 'Sentences' 버튼을 클릭하면 '/sentences'로 이동 -->
        <router-link to="/sentences" class="item-link">Sentences</router-link>
      </div>
    </div>

    <div class="right-container">
      <!-- '로그인, 회원가입' 버튼 -->
      <div class="item" v-if="!isAuthenticated">
        <router-link to="/sign" class="sign">Login</router-link>
      </div>
      <!-- '로그아웃 버튼' -->
      <div class="item" v-else>
        <a class="item-link sign" @click="logout()">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { computed } from "vue";
import instance from "@/axios";
import router from "@/router";

export default {
  name: "NavbarComponent",
  setup() {
    const isAuthenticated = computed(() => store.state.isAuthenticated);

    // 로그아웃
    const logout = () => {
      instance
        .post("/api/v1/auth/logout")
        .then(() => {
          store.dispatch("logout");
          router.push({ path: "/" });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            store.dispatch("logout");
          } else {
            console.log("로그아웃 중 에러가 발생했습니다.");
          }
        });
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
/* 네비게이션 바 스타일 */
.container {
  background-color: #1e90ff;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center; /* 중앙 정렬 */
  position: relative;
  height: 25px;
}

.left-container {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 중앙으로 정렬 */
}

.right-container {
  display: flex;
  margin-left: auto; /* 오른쪽 컨테이너를 오른쪽으로 밀어냄 */
}

.item {
  margin: 0 10px;
}

.item-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.item-link:hover {
  background-color: #4682b4;
}

.sign {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 10px; /* padding 대신 margin 사용 */
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sign:hover {
  background-color: #2f80ed;
}
</style>
