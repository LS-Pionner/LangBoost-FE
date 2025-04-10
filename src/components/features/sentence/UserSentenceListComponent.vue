<template>
    <div class="scrollable-container" @scroll="handleScroll">
        <div class="sentence-container">
            <UserSentenceComponent 
                class="sentence-item"
                v-for="sentence in filteredSentenceList"
                :key="sentence.id"
                :sentence="sentence"
                :showMeaning="showMeaning"
                :resetVisibleMeaningId="resetVisibleMeaningId"
                @modifySentence="handleModify"
                @deleteSentence="handleDelete"
            />
            <div v-if="loading" class="loading">Loading...</div>
        </div>
    </div>
</template>
    
<script setup>
import instance from '@/axios';
import { ref, onMounted, watch, defineProps, defineEmits, defineExpose } from 'vue';
import UserSentenceComponent from './UserSentenceComponent.vue';

const sentenceList = ref([]);  // API에서 가져온 문장 목록
const filteredSentenceList = ref([]);   // 학습상태가 필터링 된 문장 목록
const offset = ref(0);  // param으로 전달할 offset (데이터를 가져올 시작 위치)
const limit = 10; // param으로 전달할 limit (한 번에 가져올 데이터 수)
const loading = ref(false); // 데이터 로딩 상태
const isLastPage = ref(false);  // 마지막 페이지 여부
const learningStatusFilter = ref('all');    // 필터 상태
const resetVisibleMeaningId = ref(false);

const props = defineProps({
    sentenceSetId: {
        type: Number,
        required: true
    },
    showMeaning: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['sentenceSetRecieved']);

// 문장 수정 이벤트 수신
const handleModify = (modifiedSentence) => {
    const sentence = sentenceList.value.find(sen => sen.id === modifiedSentence.id);

    if (sentence) {
        sentence.learningStatus = modifiedSentence.learningStatus;
        updateFilteredList();
    }
}

// 문장 삭제 이벤트 수신
const handleDelete = (deletedSentenceId) => {
    filteredSentenceList.value = filteredSentenceList.value.filter(sen => sen.id !== deletedSentenceId);
}

onMounted(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 로드
    fetchSentenceList();
});

// showMeaning 값이 변경될 때 resetVisibleMeaningId를 true로 설정
watch(() => props.showMeaning, (newValue) => {
    resetVisibleMeaningId.value = newValue;
});

// 학습상태가 필터링 된 후의 문장 리스트
const updateFilteredList = () => {
    if (learningStatusFilter.value === 'all') {
        filteredSentenceList.value = sentenceList.value;
    } else {
        filteredSentenceList.value = sentenceList.value.filter(sentence => sentence.learningStatus === learningStatusFilter.value);
    }
}

const fetchSentenceList = async () => {
    // API에서 문장 데이터를 가져오는 함수
    if (isLastPage.value || loading.value) {
        return;
    }

    loading.value = true;

    try {
        const res = await instance.get(`api/v1/sentence-set/${props.sentenceSetId}?offset=${offset.value}`);
        console.log(props.sentenceSetId);
        
        if (res.data.success) {
            const data = res.data.payload;
            emit("sentenceSetRecieved", data.sentenceSet);

            sentenceList.value = [...sentenceList.value, ...data.sentenceList];
            updateFilteredList();
            
            // 불러온 데이터가 limit 미만일 때
            if (data.sentenceList.length < limit) {
                isLastPage.value = true;
            }
            
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
        fetchSentenceList();
    }
}

// 상위 컴포넌트의 학습 상태 필터링 버튼 클릭 이벤트 처리
const setLearningStatusFilter = (status) => {
    learningStatusFilter.value = status;
    updateFilteredList();
}

defineExpose({
    setLearningStatusFilter,
})

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

.sentence-container {
    max-width: 85%;
}

.sentence-item {
    cursor: pointer;
}

.loading {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: #666;
}
</style>
