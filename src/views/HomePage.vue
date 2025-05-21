<template>
  <div>
    <!-- 메인 콘텐츠 -->
    <div class="home-content">
      <h1>OPIC 랜덤 질문</h1>
      <OPICQuestionBox />
    </div>
  </div>
</template>

<script setup>
import OPICQuestionBox from "@/components/features/OPICQuestionBox.vue";
</script>

<style scoped>
/* 메인 콘텐츠 스타일 */
.home-content {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2196f3;
  margin-bottom: 30px;
  font-weight: 600;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
