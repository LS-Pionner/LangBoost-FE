<template>
  <nav class="navbar">
    <!-- 왼쪽: 로고 -->
    <div class="navbar-logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </router-link>
    </div>

    <!-- 중앙: 검색창 추가 -->
    <div class="navbar-search">
      <SearchBar @update:searchQuery="handleSearchQueryUpdate" />
    </div>

    <!-- 오른쪽: 로그인 상태에 따른 버튼 및 회원 로고 -->
    <div class="navbar-buttons">
      <template v-if="!isAuthenticated">
        <!-- BlueButtonComponent 컴포넌트 사용 -->
        <BlueButtonComponent @click="goToSignup">로그인</BlueButtonComponent>
      </template>
      <template v-else>
        <div class="user-profile">
          <img src="@/assets/user.svg" alt="User Icon" class="user-icon" />
          <!-- BlueButtonComponent 컴포넌트 사용 -->
          <BlueButtonComponent @click="logout">로그아웃</BlueButtonComponent>
        </div>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import store from "@/store";
import instance from "@/axios";
import BlueButtonComponent from "@/components/UI/buttons/BlueButtonComponent.vue";
import SearchBar from "@/components/UI/SearchBarComponent.vue";
import { ref } from "vue";

// `useRouter`로 라우터 인스턴스를 가져옵니다.
const router = useRouter();

// 로그인 상태를 계산 속성으로 가져옵니다.
const isAuthenticated = computed(() => store.state.isAuthenticated);

// searchQuery 변수 선언
const searchQuery = ref("");

// searchQuery 업데이트 핸들러
const handleSearchQueryUpdate = (newQuery) => {
  searchQuery.value = newQuery;
  console.log("검색어 업데이트:", newQuery);
};

// 로그아웃 함수
const logout = () => {
  instance
    .post("/api/v1/auth/logout")
    .then(() => {
      store.dispatch("logout");
      router.push({ path: "/" });
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        store.dispatch("logout");
      } else {
        console.log("로그아웃 중 에러가 발생했습니다.");
      }
    });
};

// 회원가입 페이지로 이동하는 함수
const goToSignup = () => {
  router.push("/sign");
};

// // 로그인 페이지로 이동하는 함수
// const goToLogin = () => {
//   router.push("/login");
// };
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border-bottom: 2px solid black;
  /* 기본적으로 모바일을 위한 스타일 */
  flex-direction: row;
}

.navbar-logo img {
  height: 40px;
}

/* 화면이 작아질 때 레이아웃 변경 */
@media (max-width: 768px) {
  .navbar {
    justify-content: space-between;
  }

  .navbar-logo {
    margin-left: 10px; /* 로고 왼쪽 여백 */
  }

  .navbar-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .navbar-links {
    display: none; /* 링크는 모바일에서는 숨김 */
  }

  .signup-btn,
  .login-btn,
  .logout-btn {
    font-size: 14px;
    padding: 8px 16px;
  }

  .user-profile {
    display: flex;
    align-items: center;
  }

  .user-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

/* 기본적인 버튼 스타일 */
.signup-btn,
.login-btn {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid black;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.signup-btn {
  background-color: white;
  color: black;
  margin-right: 10px;
}

.signup-btn:hover {
  background-color: #f2f2f2;
}

.login-btn {
  background-color: black;
  color: white;
}

.login-btn:hover {
  background-color: #333;
}

.logout-btn {
  background-color: red;
  color: white;
  border: 2px solid red;
  padding: 10px 20px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: darkred;
}
</style>
