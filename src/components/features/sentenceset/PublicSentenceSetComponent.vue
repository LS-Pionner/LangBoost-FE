<template>
    <div class="sentenceset-item">
        <div class="sentenceset-header">
            <h3>{{ truncatedTitle }}</h3>
            <div class="sentence-set-button">
                <i v-if="isAdmin"
                    class="fa-solid fa-ellipsis-vertical more-button" 
                    @click.stop="openEditModal">
                </i>
            </div>
            <EditModalComponent 
                v-if="activeModalId === sentenceSet.id"
                :sentenceSet="sentenceSet"
                :isReadOnly="true"
                @closeEdit="closeEditModal"
                @deleteSentenceSet="handleDelete"
                @modifySentenceSet="modifyHandle"
            />
        </div>
        <div class="sentence-set-info">
            <div>총 개수: {{ sentenceSet.sentenceCount }}</div>
        </div>
        <div class="date-info">
            <div class="date-info-item">생성일: {{ sentenceSet.lastViewedAt }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import EditModalComponent from '@/components/UI/modals/EditModalComponent.vue';
import { truncateString } from '@/hooks/truncate';

const props = defineProps({
    sentenceSet: {
        type: Object,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['deleteSentenceSet', 'modifySentenceSet']);

// 현재 활성화된 모달창 id
const activeModalId = ref(null);

// 편집 모달창 열기
const openEditModal = () => {
    activeModalId.value = props.sentenceSet.id;
}

// 편집 모달창 닫기
const closeEditModal = () => {
    activeModalId.value = null;
}

// title 길이 제한
const truncatedTitle = computed(() => {
    return truncateString(props.sentenceSet.title, 15);
});

// SentenceSetListComponent에 삭제된 문장 세트 id 전달
const handleDelete = (id) => {
    emit('deleteSentenceSet', id);
}

// SentenceSetListComponent에 수정된 문장 세트 id와 title 전달
const modifyHandle = (modifiedSentenceSet) => {
    emit('modifySentenceSet', modifiedSentenceSet);
}

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