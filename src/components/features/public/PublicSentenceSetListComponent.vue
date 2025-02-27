<template>
  <div class="scrollable-container" @scroll="handleScroll">
    <div class="sentenceset-container">
      <PublicSentenceSetComponent
        v-for="sentenceSet in sentenceSetList"
        :key="sentenceSet.id"
        :sentenceSet="sentenceSet"
      />
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>
  
<script setup>
import axios from '@/axios';
import { ref, onMounted } from 'vue';
import PublicSentenceSetComponent from './PublicSentenceSetComponent.vue';

const sentenceSetList = ref([]);  // API에서 가져온 문장 목록
const offset = ref(0);  // param으로 전달할 offset (데이터를 가져올 시작 위치)
const limit = 10; // param으로 전달할 limit (한 번에 가져올 데이터 수)
const loading = ref(false); // 데이터 로딩 상태
const isLastPage = ref(false);  // 마지막 페이지 여부

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
        sentenceSetList.value = [...sentenceSetList.value, ...data.sentenceSetList];
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

// 문장 세트를 클릭하면 문장 세트 상세 보기로 이동하는 함수
// const navigateToSentenceSet = (id) => {
//   const frontendBaseURL = process.env.VUE_APP_FRONTEND_BASE_URL;
//   window.location.href = `${frontendBaseURL}/public/sentence-set/${id}`; // 문자열 보간법을 사용하여 URL 설정
// }

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

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}
</style>
