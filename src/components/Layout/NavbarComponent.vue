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
        <BlueButtonComponent @click="goToSignup()">로그인</BlueButtonComponent>
      </template>
      <template v-else>
        <div class="user-menu">
          <img
            src="@/assets/user.svg"
            alt="User Icon"
            class="user-icon"
            @click="toggleMenu"
          />
          <div v-if="isMenuOpen" class="dropdown-menu">
            <button @click="goToMyPage">마이페이지</button>
            <button @click="logout">로그아웃</button>
          </div>
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

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// searchQuery 변수 선언
const searchQuery = ref("");

// searchQuery 업데이트 핸들러
const handleSearchQueryUpdate = (newQuery) => {
  searchQuery.value = newQuery;
  console.log("검색어 업데이트:", newQuery);
};

const goToMyPage = () => {
  router.push("/mypage");
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
  /* border-bottom 속성 제거 */
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

/* 검색창 스타일 */
.search-box {
  border: solid black;
  border-width: 0.3px;
  box-shadow: 0 0 0 0.2px inset #7a7a7a;
  background-color: #ffffff;
  height: 30px;
  padding: 7px;
}

.search-btn {
  color: #ffffff;
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.search-btn:hover {
  cursor: pointer;
}

.search-txt {
  float: left;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  color: rgb(0, 0, 0);
  font-size: 15px;
  line-height: 30px;
  width: 80%;
}

.search-box {
  border-radius: 40px;
}

.search-box input::placeholder {
  color: #7a7a7a;
}

/* 드롭다운 스타일 */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #fafafa;
  color: rgb(0, 0, 0);
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.dropbtn:hover {
  background-color: #4682b4;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  left: 0; /* 왼쪽 정렬 */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content .item-link {
  color: black;
  text-decoration: none;
  display: block;
  padding: 12px 16px;
}

.dropdown-content .item-link:hover {
  background-color: #4682b4;
}

.user-menu {
  position: relative;
  display: inline-block;
}

.user-icon {
  width: 40px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 120px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.dropdown-menu button {
  width: 100%;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: #f0f0f0;
}
</style>
