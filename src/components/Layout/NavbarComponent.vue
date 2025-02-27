<template>
  <div class="container">
    <div class="left-container">
      <!-- 'Home' 버튼 추가 -->
      <div class="item">
        <!-- 'Home' 버튼을 클릭하면 '/'로 이동 -->
        <router-link to="/" class="item-link">Home</router-link>
      </div>
    </div>

    <div class="middle-container">
      <!-- 'Sentences' 버튼 -->
      <div class="item">
        <!-- 'Sentences' 버튼을 클릭하면 '/sentences'로 이동 -->
        <router-link to="/public/sentence-set/list" class="item-link">공용 문장 세트</router-link>
      </div>
      <div class="item">
        <router-link to="/my/sentence-set/list" class="item-link">개인 문장 세트</router-link>
      </div>
    </div>

    <!-- 검색바 추가 -->
    <!-- <div class="middle-container">
      <div class="search-box">
        <form @submit.prevent="searchSentenceSet">
          <input class="search-txt" type="text" placeholder="검색어를 입력해 주세요">
          <button class="search-btn" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div> -->

    <div class="right-container">
      <!-- '로그인, 회원가입' 버튼 -->
      <div class="item" v-if="!isAuthenticated">
        <router-link to="/sign" class="sign">Login</router-link>
      </div>
      <!-- '로그아웃 버튼' -->
      <div class="item" v-else>
        <div class="dropdown">
          <button class="dropbtn">내정보</button>
          <div class="dropdown-content">
            <router-link to="/profile" class="item-link">마이페이지</router-link>
            <a class="item-link" @click="logout()">로그아웃</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from '@/store';
import { computed } from 'vue';
import instance from '@/axios';
import router from '@/router';

const isAuthenticated = computed(() => store.state.isAuthenticated);

// 로그아웃
const logout = () => {
  instance.post("/api/v1/auth/logout").then(() => {
    store.dispatch("logout");
    router.push({ path: "/" });
  }).catch((error) => {
    if (error.response.status === 401) {
      store.dispatch("logout");
    } else {
      console.log("로그아웃 중 에러가 발생했습니다.");
    }
  });
};

</script>

<style scoped>
/* 네비게이션 바 스타일 */
.container {
  background-color: #fafafa;
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
  left: 15%;
  /*transform: translateX(50%);   중앙으로 정렬*/
}

.middle-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.right-container {
  display: flex;
  margin-left: auto;  /* 오른쪽 컨테이너를 오른쪽으로 밀어냄 */
  transform: translateX(-150%);
}

.item {
  margin: 0 10px;
}

.item-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.item-link:hover {
  background-color: #4682b4;
  cursor: pointer;
}

.sign {
  color: rgb(0, 0, 0);
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
  background-color: #4682b4;
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
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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

</style>
