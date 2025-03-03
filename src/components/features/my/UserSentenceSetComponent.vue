<template>
    <div class="sentenceset-item">
        <div class="sentenceset-header">
            <h3>{{ truncatedTitle }}</h3>
            <div class="sentence-set-button">
                <i class="fa-solid fa-ellipsis-vertical more-button" @click="openModal"></i>
            </div>
            <EditModalComponent 
                v-if="activeModalId === sentenceSet.id"
                :sentenceSet="sentenceSet"
                @close="closeModal"
            />
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
import { defineProps, computed, ref } from 'vue';
import EditModalComponent from '@/components/UI/modals/EditModalComponent.vue';
import { truncateString } from '@/utils/truncate';

const props = defineProps({
    sentenceSet: {
        type: Object,
        required: true
    },
});

const activeModalId = ref(null);

const openModal = () => {
    // 현재 열려 있는 모달창이 있으면 닫기
    console.log('>>', activeModalId);
    
    if (activeModalId.value !== null) {
        closeModal();
    }

    activeModalId.value = props.sentenceSet.id;
}

const closeModal = () => {
    activeModalId.value = null;
}

const truncatedTitle = computed(() => {
    return truncateString(props.sentenceSet.title, 15);
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
    /* cursor: pointer; */
}

.sentenceset-item:hover {
    background-color: #ececec;
}

.sentenceset-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sentenceset-item h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
    text-align: center;
    flex-grow: 1; /* 버튼과의 간격을 조절하기 위해 사용 */
}

.sentence-set-button {
    margin-left: 10px;
    font-size: 24px;
}

.more-button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.more-button:hover {
    color: white;
    background-color: #0056b3;
}

.sentence-set-info {
    font-size: 12px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 10px;
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