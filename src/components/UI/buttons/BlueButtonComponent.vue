<template>
  <button class="blue-btn">
    <slot>버튼</slot>
    <!-- 부모로부터 전달받은 버튼 텍스트 -->
  </button>
</template>

<script setup>
// 이 경우 별도의 `data`, `methods` 등이 필요없어, 굳이 `script setup`에서 로직을 추가하지 않습니다.
</script>

<style scoped>
.blue-btn {
  background-color: #35abff; /* 내부 배경색 */
  color: white; /* 글씨 색깔 */
  border: 2px solid #555555; /* 검은색 테두리 */
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.blue-btn:hover {
  background-color: #2a8fcb; /* 버튼 hover 시 색상 */
}
</style>
