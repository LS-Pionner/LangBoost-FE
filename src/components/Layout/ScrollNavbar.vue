<template>
  <nav :class="['navbar', { fixed: isFixed }]">
    <!-- Navbar 내용 -->
    <div class="navbar-buttons">
      <router-link to="/public-sentences">
        <div class="navbar-link">공용 문장 세트</div>
      </router-link>
      <router-link to="/private-sentences">
        <div class="navbar-link">개인 문장 세트</div>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 'isFixed' 상태 변수 선언
const isFixed = ref(false);

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  isFixed.value = window.scrollY > 100; // 스크롤 위치에 따라 NavBar 고정
};

// 컴포넌트 마운트 시 이벤트 리스너 추가
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: white; /* 배경을 하얀색으로 */
  color: black; /* 글씨를 검은색으로 */
  padding: 10px 0;
  text-align: center;
  border-bottom: 2px solid black; /* 아래에만 검은 선 추가 */
  transition: top 0.3s ease-in-out;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-buttons {
  display: flex; /* 가로로 나란히 배치 */
  justify-content: center; /* 가운데 정렬 */
  gap: 20px; /* 버튼 간격 */
  margin-top: 10px;
}

.navbar-buttons a {
  text-decoration: none; /* 링크의 기본 스타일 제거 */
}

.navbar-link {
  padding: 8px 16px;
  background-color: transparent; /* 배경색 제거 */
  color: black; /* 글씨 색상 검은색 */
  cursor: pointer;
  text-align: center;
  border: none;
  font-size: 16px;
}

.navbar-link:hover {
  background-color: transparent; /* 호버 시 배경색 변경하지 않음 */
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>
