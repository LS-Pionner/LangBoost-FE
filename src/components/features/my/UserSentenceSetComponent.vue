<template>
    <div class="sentenceset-item">
        <div class="sentenceset-title">
        <h3>{{ truncatedTitle }}</h3>
    </div>
        <div class="sentence-set-info">
            <div>총 개수: {{ sentenceSet.sentenceCount }}</div>
            <div>학습 중: {{ sentenceSet.inProgressSentenceCount }}</div>
            <div>학습 완료: {{ sentenceSet.completedSentenceCount }}</div>
        </div>
        <div class="date-info">
        <div class="date-info-item">생성일: {{ sentenceSet.lastViewedAt }}</div>
        <div class="date-info-item">최근 학습일: {{ sentenceSet.lastViewedAt }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    sentenceSet: {
        type: Object,
        required: true
    },
});

const truncatedTitle = computed(() => {
    const title = props.sentenceSet.title;
    return title.length > 15 ? title.substring(0, 15) + '...' : title;
});

</script>

<style scoped>
  .sentenceset-item {
    position: relative;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  .sentenceset-item:hover {
    background-color: #ececec;
  }
  
  .sentenceset-title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translateY(50%);
  }
  
  .sentenceset-item h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  .meaning {
    margin: 10px 0;
    font-size: 14px;
    color: #555;
  }

  .sentence-set-info {
    font-size: 12px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

  }
  
  .date-info-item {
    font-size: 12px;
    color: #999;
    margin: 2px 0px;
  }
</style>