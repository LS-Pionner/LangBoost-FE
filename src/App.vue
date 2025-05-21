<template>
  <div id="app">
    <NavbarComponent />
    <main class="main-content">
      <router-view></router-view>
    </main>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: clip;
}

.main-content {
  flex: 1 0 auto;
  width: 100%;
  padding: 80px 20px 20px; /* 상단 패딩을 늘려 햄버거 메뉴와 겹치지 않도록 조정 */
}

/* 기본 스타일 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans KR", sans-serif;
  line-height: 1.6;
  color: #333;
}
</style>
