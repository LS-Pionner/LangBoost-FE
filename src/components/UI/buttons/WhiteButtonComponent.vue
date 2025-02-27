<template>
  <button class="white-btn">
    <slot>버튼</slot>
    <!-- 부모로부터 전달받은 버튼 텍스트 -->
  </button>
</template>

<script setup>
// 별도의 로직은 필요하지 않으므로, 추가하지 않았습니다.
</script>

<style scoped>
.white-btn {
  background-color: white; /* 내부 배경색 */
  color: black; /* 글씨 색깔 */
  border: 2px solid #dedee2; /* 검은색 테두리 */
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.white-btn:hover {
  background-color: #f2f2f2; /* 버튼 hover 시 색상 */
}
</style>
