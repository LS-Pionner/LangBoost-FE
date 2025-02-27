<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="문장 세트 검색"
      class="search-input"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// 검색어를 관리하는 변수
const searchQuery = ref("");
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  max-width: 300px;
  width: 100%;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  font-size: 14px;
}
</style>
