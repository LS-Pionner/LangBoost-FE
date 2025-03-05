<template>
  <div class="sentence-page">
    <header class="page-header">
      <h1>Sentence Set</h1>
    </header>

    <div class="side-content">
      <router-link to="/new-sentence">문장추가</router-link>
    </div>

    <main class="page-content">
      <!-- Sorting Component -->
      <SortingSentenceComponent />

      <!-- Infinite Scroll Component for Sentences -->
      <SentencePageComponent />
    </main>
  </div>
</template>

<script>
import SortingSentenceComponent from "@/components/features/sentences/SortingSentenceComponent.vue";
import SentencePageComponent from "@/components/features/sentences/SentencePageComponent.vue";

export default {
  name: "PageView",
  components: {
    SortingSentenceComponent,
    SentencePageComponent,
  },
};
</script>

<style scoped>
.sentence-page {
  font-family: Arial, sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-header {
  background-color: #1e90ff;
  color: white;
  padding: 20px;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  font-size: 24px;
}

.page-content {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  box-sizing: border-box;
}

.side-content {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
}
</style>
