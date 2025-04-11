<template>
    <div class="sentence-item" @click="toggleMeaning">
        <div class="sentence-header">
            <h3 v-if="visibleMeaningId === null">
                <i v-if="showMeaning" class="fa-solid fa-volume-high item-button" @click.stop="playKoreanSound"></i>
                <i v-else class="fa-solid fa-volume-high item-button" @click.stop="playEnglishSound"></i>
                
                <span v-if="showMeaning">{{ sentence.meaning }}</span>
                <span v-else>{{ sentence.content }}</span>
            </h3>
            <h3 v-else>
                <i v-if="showMeaning" class="fa-solid fa-volume-high item-button" @click.stop="playEnglishSound"></i>
                <i v-else class="fa-solid fa-volume-high item-button" @click.stop="playKoreanSound"></i>

                <span v-if="showMeaning">{{ sentence.content }}</span>
                <span v-else>{{ sentence.meaning }}</span>
            </h3>
            <div class="sentence-button">
                <i class="fa-solid fa-up-right-and-down-left-from-center enlarge-button" @click.stop="navigateSentenceDetail"></i>
                <i class="fa-solid fa-ellipsis-vertical more-button" @click.stop="openEditModal"></i>
            </div>
            <LearningModalComponent 
                v-if="activeModalId === sentence.id"
                :sentence="sentence"
                @modifySentence="modifyHandle"
                @deleteSentence="deleteHandle"
                @closeEdit="closeEditModal"
            />
        </div>
        <div class="sentence-footer">
            {{ sentence.learningStatus }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import LearningModalComponent from '@/components/UI/modals/LearningModalComponent.vue';
import router from '@/router';
import store from '@/store';
import { useSoundPlay } from '@/hooks/useSoundPlay';

const props = defineProps({
    sentence: {
        type: Object,
        required: true
    },
    showMeaning: {
        type: Boolean,
        required: true
    },
    resetVisibleMeaningId: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['modifySentence', 'deleteSentence']);

const activeModalId = ref(null);    // 현재 활성화된 모달창 id
const visibleMeaningId = ref(null); // 의미를 보여줄 문장 ID

const { soundPlay } = useSoundPlay();   // 컴포저블 함수 사용

// showMeaning이 변경되면 visibleMeaningId를 null로 초기화
watch(() => props.resetVisibleMeaningId, () => {
    visibleMeaningId.value = null;
});

// 영어 문장 재생 함수
const playEnglishSound = () => {
    soundPlay('ENGLISH', props.sentence.content);
}

// 한글 문장 재생 함수
const playKoreanSound = () => {
    soundPlay('KOREAN', props.sentence.meaning);
}

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

// SentenceListComponent에 삭제된 문장 전달
const deleteHandle = (deletedSentenceId) => {
    emit('deleteSentence', deletedSentenceId);
}

// 문장 의미 토글 함수
const toggleMeaning = () => {
    visibleMeaningId.value = visibleMeaningId.value === null ? props.sentence.id : null;
}

// 문장 상세 페이지 이동 함수
const navigateSentenceDetail = () => {
    store.dispatch("updateDetailSentence", props.sentence);
    router.push({ path: '/private-sentences/detail' });
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
    align-items: flex-end;
}

.item-button {
    margin-left: 10px;
    margin-right: 20px;
}

.sentence-item h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
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