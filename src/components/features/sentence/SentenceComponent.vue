<template>
    <div class="sentence-item">
        <div class="sentence-header">
            <h3>{{ sentence.content }}</h3>
            <div class="sentence-button">
                <i class="fa-solid fa-up-right-and-down-left-from-center enlarge-button"></i>
                <i v-if="isAdmin || !isReadOnly" 
                    class="fa-solid fa-ellipsis-vertical more-button" 
                    @click.stop="openEditModal">
                </i>
            </div>
            <LearningModalComponent 
                v-if="activeModalId === sentence.id"
                :sentence="sentence"
                @modifySentence="modifyHandle"
                @closeEdit="closeEditModal"
            />
        </div>
        <div class="sentence-footer">
            {{ sentence.learningStatus }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import LearningModalComponent from '@/components/UI/modals/LearningModalComponent.vue';

const props = defineProps({
    sentence: {
        type: Object,
        required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    isReadOnly: {
      type: Boolean,
      required: true
    },
});

const emit = defineEmits(['modifySentence']);

// 현재 활성화된 모달창 id
const activeModalId = ref(null);

// 편집 모달창 열기
const openEditModal = () => {
    activeModalId.value = props.sentence.id;
}

// 편집 모달창 닫기
const closeEditModal = () => {
    activeModalId.value = null;
}

// SentenceListComponent에 수정된 문장 전달
const modifyHandle = (modifiedSentence) => {
    emit('modifySentence', modifiedSentence);
}

</script>

<style scoped>
  .sentence-item {
    position: relative;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    /* cursor: pointer; */
}

.sentence-item:hover {
    background-color: #ececec;
}

.sentence-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sentence-item h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
    text-align: center;
    flex-grow: 1; /* 버튼과의 간격을 조절하기 위해 사용 */
}

.sentence-button {
    margin-left: 10px;
    font-size: 24px;
}

.enlarge-button {
    font-size: 18px;
    margin-right: 2px;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.enlarge-button:hover {
    color: white;
    background-color: #0056b3;
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

.sentence-footer {
    display: flex;
    justify-content: flex-end;
}
</style>