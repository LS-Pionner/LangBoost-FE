<template>
  <div>
    <h1>About Us</h1>
    <p>This page provides information about our application.</p>
    <!-- 자식 컴포넌트에 sentenceId 전달 -->
    <SentenceComponent :sentenceId="sentenceId" />
    <WordListComponent :sentenceId="sentenceId" />
    <ReferenceComponent :sentenceId="sentenceId" />
  </div>
</template>

<script>
import SentenceComponent from "../components/Pages/Sentences/SentenceComponent.vue";
import WordListComponent from "../components/Pages/Words/WordListComponent.vue";
import ReferenceComponent from "../components/Pages/References/ReferenceComponent.vue";

export default {
  name: "SentenceDetailView",
  components: {
    SentenceComponent,
    WordListComponent,
    ReferenceComponent,
  },
  data() {
    return {
      // URL에서 sentenceId 값을 가져옴
      sentenceId: this.$route.params.sentenceId,
    };
  },
  watch: {
    // URL이 바뀌면 sentenceId 업데이트
    "$route.params.sentenceId"(newId) {
      this.sentenceId = newId;
    },
  },
};
</script>

<style scoped>
h1 {
  color: #ff6347;
}
</style>
