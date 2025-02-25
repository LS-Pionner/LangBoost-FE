<template>
  <div id="app">
    <NavbarComponent />
    <!-- 네비게이션 바 추가 -->
    <router-view></router-view>
    <!-- 라우터에 따라 페이지 내용 표시 -->
    <div class="footer-wrapper">
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/layout/NavbarComponentTemp.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
</script>

<style>
/* 전체 레이아웃 스타일 */
#app {
  min-height: 100vh; /* 화면 최소 높이를 100vh로 설정 */
  display: flex;
  flex-direction: column;
}

/* 푸터를 감싸는 div에 고정 스타일 적용 */
.footer-wrapper {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%); /* 중앙으로 정렬 */
  width: 100%;
  z-index: 10; /* 푸터가 다른 내용 위에 표시되도록 설정 */
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
}

/* 푸터 스타일 */
footer {
  flex-shrink: 0; /* 푸터 크기 변경을 방지 */
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 10px;
  text-align: center; /* 텍스트 중앙 정렬 */
}
</style>
