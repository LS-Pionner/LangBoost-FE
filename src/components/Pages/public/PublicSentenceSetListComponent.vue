<template>
  <div class="scrollable-container" @scroll="handleScroll">
    <div class="sentenceset-container">
      <div
        v-for="sentenceSet in sentenceSetList"
        :key="sentenceSet.id"
        class="sentenceset-item"
        @click="toggleMeaning(sentenceSet.id)"
      >
        <div class="sentenceset-header">
          <h3>{{ sentenceSet.title }}</h3>
          <button
            class="details-button"
            @click.stop="navigateToSentenceSet(sentenceSet.id)"
          >
            세부
          </button>
        </div>
        <p v-if="visibleMeaningId === sentenceSet.id" class="meaning">
          {{ sentenceSet.description }}
        </p>
        <p class="last-viewed">최근 조회일: {{ sentenceSet.lastViewedAt }}</p>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>
  
<script setup>
import axios from '@/axios';
import { ref, onMounted } from 'vue';

const sentenceSetList = ref([]);  // API에서 가져온 문장 목록
const offset = ref(0);  // param으로 전달할 offset (데이터를 가져올 시작 위치)
const limit = 10; // param으로 전달할 limit (한 번에 가져올 데이터 수)
const loading = ref(false); // 데이터 로딩 상태
const isLastPage = ref(false);  // 마지막 페이지 여부
const visibleMeaningId = ref(null); // 의미를 보여줄 문장의 ID (초기 값은 null)

onMounted(() => {
  // 컴포넌트가 마운트될 때 초기 데이터 로드
  fetchsentenceSetList();
});

const fetchsentenceSetList = async () => {
  // API에서 문장 데이터를 가져오는 함수
  if (isLastPage.value || loading.value) {
    return;
  }

  loading.value = true;

  try {
    const res = await axios.get(`api/v1/public/sentence-set?offset=${offset.value}`);

    if (res.data.success) {
      const data = res.data.payload;

      // 불러온 데이터가 limit 미만일 때
      if (data.sentenceSetList.length < limit) {
        isLastPage.value = true;
        return;
      }
      
      sentenceSetList.value = [...sentenceSetList.value, ...data.sentenceSetList];
      offset.value += limit;
    } else {
      console.error("API 오류: ", res.data.error);
    }
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생: ", error);
  } finally {
    loading.value = false;
  }
}

// 스크롤이 아래로 내려갔을 때 데이터 로드를 트리거하는 함수
const handleScroll = (event) => {
  const container = event.target;

  if (container.scrollHeight - container.scrollTop <= container.clientHeight + 10) {
    fetchsentenceSetList();
  }
}

// 문장 세트를 클릭했을 때 토글로 설명을 보여주는 함수
const toggleMeaning = (id) => {
  visibleMeaningId.value = visibleMeaningId.value === id ? null : id;
}

// 문장 세트를 클릭하면 문장 세트 상세 보기로 이동하는 함수
const navigateToSentenceSet = (id) => {
  const frontendBaseURL = process.env.VUE_APP_FRONTEND_BASE_URL;
  window.location.href = `${frontendBaseURL}/public/sentence-set/${id}`; // 문자열 보간법을 사용하여 URL 설정
}

</script>

<style scoped>
.scrollable-container {
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.sentenceset-container {
  max-width: 600px;
  margin: 0 auto;
}

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

.sentenceset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details-button {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #0056b3;
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

.last-viewed {
  font-size: 12px;
  color: #999;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}
</style>
