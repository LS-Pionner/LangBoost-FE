<template>
    <div class="scrollable-container" @scroll="handleScroll">
      <div class="sentenceset-container">
        <UserSentenceSetComponent class="sentenceset-item"
          v-for="sentenceSet in sentenceSetList"
          :key="sentenceSet.id"
          :sentenceSet="sentenceSet"
          @deleteSentenceSet="handleDelete"
          @modifySentenceSet="handleModify"
          @click="(event) => navigateSentence(sentenceSet.id, event)"
        />
        <div v-if="loading" class="loading">Loading...</div>
      </div>
    </div>
  </template>
    
  <script setup>
  import instance from '@/axios';
  import { ref, onMounted, defineEmits, defineProps, watch } from 'vue';
  import UserSentenceSetComponent from './UserSentenceSetComponent.vue';
  import router from '@/router';

  const emit = defineEmits(['sentenceSetCountReceived']);
  
  const sentenceSetList = ref([]);  // API에서 가져온 문장 목록
  const offset = ref(0);  // param으로 전달할 offset (데이터를 가져올 시작 위치)
  const limit = 10; // param으로 전달할 limit (한 번에 가져올 데이터 수)
  const loading = ref(false); // 데이터 로딩 상태
  const isLastPage = ref(false);  // 마지막 페이지 여부
  let sentenceSetCount = null;  // 상위 컴포넌트에 전달할 문장 세트 개수

  const props = defineProps({
    newSentenceSet: {
      type: Object,
      required: false
    },
  });

  // 새로 추가된 문장 세트를 기존 문장 세트 목록에 포함
  watch(() => props.newSentenceSet, (newSet) => {
    if (newSet) {
        sentenceSetList.value.unshift(newSet);
    }
  });

  // 문장 세트 삭제 이벤트 수신
  const handleDelete = (id) => {
    sentenceSetList.value = sentenceSetList.value.filter(set => set.id !== id);
  }

  // 문장 세트 수정 이벤트 수신
  const handleModify = (modifiedSentenceSet) => {
    const sentenceSet = sentenceSetList.value.find(set => set.id === modifiedSentenceSet.id);
    
    if (sentenceSet) {
      sentenceSet.title = modifiedSentenceSet.title;
    }
  }

  onMounted(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 로드
    fetchSentenceSetList();
  });
  
  const fetchSentenceSetList = async () => {
    // API에서 문장 데이터를 가져오는 함수
    if (isLastPage.value || loading.value) {
      return;
    }
  
    loading.value = true;
  
    try {
      const res = await instance.get(`api/v1/sentence-set?offset=${offset.value}`);
        
      if (res.data.success) {
        const data = res.data.payload;

        // 문장 세트 개수가 변경될 경우에만 전달
        if (sentenceSetCount !== data.sentenceSetCount) {
          emit('sentenceSetCountReceived', data.sentenceSetCount);
          sentenceSetCount = data.sentenceSetCount;
        }
  
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
      fetchSentenceSetList();
    }
  }

  // 문장 세트 클릭 시 문장 세트 & 문장 목록 조회 페이지로 이동
  const navigateSentence = (sentenceSetId, event) => {
    if (event.target.closest(".more-button")) {
      return;
    }

    router.push({ 'path': `/private-sentences/${sentenceSetId}` });
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
    max-width: 85%;
  }

  .sentenceset-item {
    cursor: pointer;
  }
  
  .loading {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: #666;
  }
  </style>
  