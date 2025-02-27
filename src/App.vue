<template>
  <div id="app">
    <NavbarComponent />
    <!-- 네비게이션 바 추가 -->
    <router-view></router-view>
    <!-- 라우터에 따라 페이지 내용 표시 -->
    <FooterComponent />
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/layout/NavbarComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";

</script>

<style>
/* 전체 레이아웃 스타일 */
#app {
  min-height: 100vh; /* 화면 최소 높이를 100vh로 설정 */
  display: flex;
  flex-direction: column;
}
</style>
