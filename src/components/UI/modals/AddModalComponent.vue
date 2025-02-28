<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content">
            <i class="fa-regular fa-circle-xmark close-modal" @click="closeModal"></i>
            <h3>새로운 세트 추가</h3>
            <input 
                type="text"
                v-model="sentenceSetName"
                placeholder="문장 세트 이름"
            />
            <div class="modal-buttons">
                <BlueButtonComponent @click="addSentenceSet">추가</BlueButtonComponent>
                <WhiteButtonComponent @click="closeModal">취소</WhiteButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import BlueButtonComponent from '../buttons/BlueButtonComponent.vue';
import { ref, defineProps, defineEmits } from 'vue';
import WhiteButtonComponent from '../buttons/WhiteButtonComponent.vue';

defineProps({
    isVisible: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['close', 'add']);

const sentenceSetName = ref('');    // 추가할 문장 세트 이름

// 모달창 닫기
const closeModal = () => {
    emit('close');
}

// 새로운 문장 세트 추가
const addSentenceSet = () => {
    if (sentenceSetName.value.trim() === '') {
        alert('문장 세트 이름을 입력해주세요.');
        return;
    }

    emit('add', sentenceSetName.value);
    sentenceSetName.value = '';
    closeModal();
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 어두운 배경 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    transition: color 0.3s;
}

.close-modal:hover {
    color: black;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 600px;
    position: relative;
}

.modal-content h3 {
    margin-top: 0;
    color: #333;
    font-size: 20px;
}

.modal-content input {
    width: 95%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
}

.modal-content button {
    margin-left: 10px;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
}

</style>
