<template>
  <div class="navbar-container">
    <!-- 햄버거 메뉴 버튼 -->
    <div class="menu-toggle-container">
      <button class="menu-toggle" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
      </button>
      <router-link to="/" class="logo-link">
        <img src="@/assets/logo.png" alt="LangBoost Logo" class="logo-img" />
      </router-link>
    </div>

    <!-- 오른쪽 상단 회원 메뉴 -->
    <div class="user-menu-container">
      <template v-if="!isAuthenticated">
        <BlueButtonComponent @click="goToSignup()">로그인</BlueButtonComponent>
      </template>
      <template v-else>
        <div class="user-menu">
          <img
            src="@/assets/user.svg"
            alt="User Icon"
            class="user-icon"
            @click="toggleUserMenu"
          />
          <div v-if="isUserMenuOpen" class="dropdown-menu">
            <button @click="goToMyPage">마이페이지</button>
            <button @click="logout">로그아웃</button>
          </div>
        </div>
      </template>
    </div>

    <!-- 사이드바 -->
    <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
      <div class="sidebar-header">
        <router-link to="/" class="logo-link">
          <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
        </router-link>
        <button class="close-btn" @click="toggleSidebar">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="sidebar-content">
        <div class="search-container">
          <SearchBar @update:searchQuery="handleSearchQueryUpdate" />
        </div>

        <nav class="sidebar-nav">
          <router-link
            to="/private-sentences"
            class="nav-item"
            @click="toggleSidebar"
          >
            <i class="fas fa-book"></i>
            <span>개인 문장 세트</span>
          </router-link>
        </nav>
      </div>
    </div>

    <!-- 사이드바 오버레이 -->
    <div v-if="isOpen" class="sidebar-overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import store from "@/store";
import instance from "@/axios";
import BlueButtonComponent from "@/components/UI/buttons/BlueButtonComponent.vue";
import SearchBar from "@/components/UI/SearchBarComponent.vue";

const router = useRouter();
const isAuthenticated = computed(() => store.state.isAuthenticated);
const isOpen = ref(false);
const isUserMenuOpen = ref(false);
const searchQuery = ref("");

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    isUserMenuOpen.value = false;
  }
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const handleSearchQueryUpdate = (newQuery) => {
  searchQuery.value = newQuery;
  console.log("검색어 업데이트:", newQuery);
};

const goToMyPage = () => {
  router.push("/mypage");
  isOpen.value = false;
};

const logout = () => {
  instance
    .post("/api/v1/auth/logout")
    .then(() => {
      store.dispatch("logout");
      router.push({ path: "/" });
      isOpen.value = false;
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        store.dispatch("logout");
      } else {
        console.log("로그아웃 중 에러가 발생했습니다.");
      }
    });
};

const goToSignup = () => {
  router.push("/sign");
  isOpen.value = false;
};
</script>

<style scoped>
.navbar-container {
  position: relative;
}

.menu-toggle-container {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s;
}

.menu-toggle:hover {
  color: #2196f3;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.user-menu-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.user-menu {
  position: relative;
  display: flex;
  justify-content: center;
}

.user-icon {
  width: 40px;
  cursor: pointer;
  transition: transform 0.2s;
}

.user-icon:hover {
  transform: scale(1.1);
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 120px;
  background: white;
  border: 1px solid #e9ecef;
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
  text-align: left;
}

.dropdown-menu button:hover {
  background: #f8f9fa;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 5px;
}

.close-btn:hover {
  color: #2196f3;
}

.sidebar-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-container {
  width: 100%;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.sidebar-nav {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  text-decoration: none;
  color: #333;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #f8f9fa;
  color: #2196f3;
}

.nav-item i {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

@media (max-width: 768px) {
  .menu-toggle-container {
    top: 15px;
    left: 15px;
  }

  .logo-img {
    height: 35px;
  }

  .sidebar {
    width: 100%;
    left: -100%;
  }

  .user-menu-container {
    top: 15px;
    right: 15px;
  }
}
</style>
