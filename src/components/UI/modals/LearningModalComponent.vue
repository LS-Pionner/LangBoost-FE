<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <i class="fa-regular fa-circle-xmark close-modal" @click.stop="closeEditModal"></i>
            <i class="fa-solid fa-check modal-button" @click.stop="setLearningStatus('COMPLETED')">학습 완료</i>
            <i class="fa-solid fa-pen modal-button" @click.stop="setLearningStatus('IN_PROGRESS')">학습 중</i>
            <i class="fa-solid fa-trash modal-button modal-trash" @click.stop="deleteSentence">삭제</i>
        </div>
    </div>
</template>

<script setup>
import instance from '@/axios';
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
    sentence: {
        type: Object,
        required: true,
    },
});
console.log(props);

const emit = defineEmits(['closeEdit', 'modifySentence', 'deleteSentence']);

// 학습 상태
const learningStatus = ref(null);

// 편집 모달창 닫기
const closeEditModal = () => {
    emit('closeEdit');
}

// 학습 상태 세팅 & API 호출
const setLearningStatus = (status) => {
    learningStatus.value = status;
    modifyLearningStatus();
}

// 학습 상태 수정 함수
const modifyLearningStatus = async () => {
    try {
        const res = await instance.put(`api/v1/sentence-set/sentence/${props.sentence.id}/learning-status`,
            { learningStatus: learningStatus.value }
        );

        if (res.data.success) {
            emit('modifySentence', res.data.payload);

            console.log(res.data.payload);
            window.alert('학습 상태가 변경되었습니다.');

            closeEditModal();
        }
    } catch (error) {
        console.log(error);
        window.alert('학습 상태 수정 중 에러가 발생했습니다.');
    }
}

// 문장 삭제 함수수
const deleteSentence = async () => {
    try {
        const res = await instance.delete(`api/v1/sentence-set/sentence/${props.sentence.id}`);

        if (res.data.success) {
                emit('deleteSentence', props.sentence.id);

                console.log(res.data.payload);
                window.alert('문장이 삭제되었습니다.');

                closeEditModal();
            }
        } catch (error) {
            console.log(error);
            window.alert('문장 삭제 중 에러가 발생했습니다.');
        }
}

</script>

<style scoped>
.modal-overlay {
    left: 100%;
    margin-left: 10px;
    position: absolute;
    z-index: 999; /* ModifyModalComponent를 최상위에 표시하기 위함 */
}

.close-modal {
    position: relative;
    top: 25px;
    left: 40px;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    transition: color 0.3s;
    display: flex;
    justify-content: space-around;
}

.close-modal:hover {
    color: black;
}

.modal-content {
    background: white;
    /* padding: 15px; */
    position: relative;
    width: 100px;
    z-index: 1000;
}

.modal-button {
    position: relative;
    font-size: 16px;
    top: 20px;
    color: black;
    margin-top: 15px;
}

.modal-button::before {
    cursor: pointer;
    margin: 3px;
}

.modal-button:hover {
    color: #999;
}

.modal-trash {
    color: red;
}
</style>
