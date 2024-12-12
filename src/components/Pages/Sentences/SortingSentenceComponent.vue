<template>
  <div class="sorting-container">
    <header class="sorting-header">
      <h2>문장 정렬</h2>
      <div class="sorting-options">
        <label for="sort-order">정렬 기준:</label>
        <select v-model="sortOrder" id="sort-order" @change="onSortChange">
          <option value="lastViewedAsc">최근 본 순서 (오름차순)</option>
          <option value="lastViewedDesc">최근 본 순서 (내림차순)</option>
        </select>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "SortingSentenceComponent",
  data() {
    return {
      sortOrder: "lastViewedDesc", // 정렬 기준 (기본값: 최근 본 순서 내림차순)
    };
  },
  methods: {
    onSortChange() {
      // 정렬 기준이 바뀌었을 때 상위 컴포넌트에 이벤트를 보내서 데이터를 갱신
      this.$emit("sort-changed", this.sortOrder);
    },
  },
};
</script>

<style scoped>
.sorting-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.sorting-header {
  font-size: 18px;
  font-weight: bold;
}

.sorting-options select {
  padding: 5px;
  font-size: 14px;
}
</style>
