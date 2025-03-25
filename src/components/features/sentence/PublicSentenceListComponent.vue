<template>
    <div class="scrollable-container" @scroll="handleScroll">
        <div :class="{'sentence-container' : isAdmin}">
            <PublicSentenceComponent 
                class="sentence-item"
                v-for="sentence in sentenceList"
                :key="sentence.id"
                :sentence="sentence"
                :isAdmin="isAdmin"
                @modifySentence="handleModify"
            />
            <div v-if="loading" class="loading">Loading...</div>
        </div>
    </div>
</template>
    
<script setup>
import instance from '@/axios';
import { ref, onMounted, computed, defineProps, defineEmits } from 'vue';
import store from '@/store';
import PublicSentenceComponent from './PublicSentenceComponent.vue';

const sentenceList = ref([]);  // API에서 가져온 문장 목록
const offset = ref(0);  // param으로 전달할 offset (데이터를 가져올 시작 위치)
const limit = 10; // param으로 전달할 limit (한 번에 가져올 데이터 수)
const loading = ref(false); // 데이터 로딩 상태
const isLastPage = ref(false);  // 마지막 페이지 여부

const isAdmin = computed(() => store.state.isAdmin);    // 관리자 권한 여부

const props = defineProps({
    sentenceSetId: {
        type: Number,
        required: true
    },
});

const emit = defineEmits(['sentenceSetRecieved']);

// 문장 수정 이벤트 수신
const handleModify = (modifiedSentence) => {
    const sentence = sentenceList.value.find(sen => sen.id === modifiedSentence.id);

    if (sentence) {
        sentence.learningStatus = modifiedSentence.learningStatus;
    }
}

onMounted(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 로드
    fetchSentenceList();
});

const fetchSentenceList = async () => {
    // API에서 문장 데이터를 가져오는 함수
    if (isLastPage.value || loading.value) {
        return;
    }

    loading.value = true;

    try {
        const res = await instance.get(`api/v1/public/sentence-set/${props.sentenceSetId}?offset=${offset.value}`);
        
        if (res.data.success) {
            const data = res.data.payload;

            emit("sentenceSetRecieved", data.sentenceSet);
            
            // 불러온 데이터가 limit 미만일 때
            if (data.sentenceList.length < limit) {
                isLastPage.value = true;
                sentenceList.value = [...sentenceList.value, ...data.sentenceList];
                return;
            }
            
            sentenceList.value = [...sentenceList.value, ...data.sentenceList];
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
