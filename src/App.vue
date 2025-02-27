<!-- App.vue -->
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
/* 여기에 앱 전체에 대한 스타일을 추가할 수 있습니다. */
</style>
