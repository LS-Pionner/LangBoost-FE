<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <i class="fa-regular fa-circle-xmark close-modal" @click="closeModal"></i>
            <i class="fa-regular fa-pen-to-square modal-button"></i>
            <i class="fa-regular fa-trash-can modal-button modal-discard"></i>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

// 모달창 닫기
const closeModal = () => {
    emit('close');
}

</script>

<style scoped>
.modal-overlay {
    width: 20%;
    left: 100%;
    margin-left: 10px;
    position: absolute;
}

.close-modal {
    position: relative;
    top: 25px;
    left: 40px;
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
    position: relative;
    width: 10px;
}

.modal-button {
    position: relative;
    font-size: 30px;
    top: 20px;
    color: black;
}

.modal-button::before {
    cursor: pointer;
    margin: 3px;
}

.modal-button:hover {
    color: #999;
}

.modal-discard {
    margin-top: 15px;
}
</style>
