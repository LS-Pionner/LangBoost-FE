<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <i class="fa-regular fa-circle-xmark close-modal" @click="closeModal"></i>
            <i class="fa-regular fa-pen-to-square modal-button"></i>
            <i class="fa-regular fa-trash-can modal-button modal-discard" @click="deleteSentenceSet"></i>
        </div>
    </div>
</template>

<script setup>
import instance from '@/axios';
import { defineEmits, defineProps } from 'vue';
import { truncateString } from '@/utils/truncate';

const props = defineProps({
    sentenceSet: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'deleted']);

// 모달창 닫기
const closeModal = () => {
    emit('close');
}

const deleteSentenceSet = async () => {
    const title = truncateString(props.sentenceSet.title, 15);
    const isDelete = window.confirm(title + "을/를 삭제하시겠습니까?");
    
    if (isDelete) {
        try {
            const res = await instance.delete(`api/v1/sentence-set/${props.sentenceSet.id}`);

            if (res.data.success) {
                // UserSentenceSetComponent에 삭제된 문장 세트 id 전달
                emit('deleted', props.sentenceSet.id);

                console.log(res.data.payload);
                window.alert('문장 세트가 삭제되었습니다.');

                closeModal();
            }
        } catch (error) {
            console.log(error);
            window.alert('문장 세트 삭제 중 에러가 발생했습니다.');
        }
    }
}

</script>

<style scoped>
.modal-overlay {
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
