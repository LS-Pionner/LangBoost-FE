<template>
    <div class="modal-overlay">
        <div class="modal-content" @click.stop>
            <i class="fa-regular fa-circle-xmark close-modal" @click="closeEditModal"></i>
            <i class="fa-regular fa-pen-to-square modal-button" @click="openModifyModal"></i>
            <i class="fa-regular fa-trash-can modal-button modal-discard" @click="deleteSentenceSet"></i>
        </div>
    </div>
    <ModifyModalComponent 
        v-if="activeModalId === sentenceSet.id"
        :sentenceSet="sentenceSet"
        :isAdmin="isAdmin"
        :isReadOnly="isReadOnly"
        @closeModify="closeModifyModal"
        @modifySentenceSet="modifyHandle"
    />
</template>

<script setup>
import instance from '@/axios';
import { computed, defineEmits, defineProps, ref } from 'vue';
import { truncateString } from '@/utils/truncate';
import ModifyModalComponent from './ModifyModalComponent.vue';
import store from '@/store';

const props = defineProps({
    sentenceSet: {
        type: Object,
        required: true,
    },
    isReadOnly: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['closeEdit', 'deleteSentenceSet', 'modifySentenceSet']);

const isAdmin = computed(() => store.state.isAdmin);    // 관리자 여부

// 문장 세트 수정 모달창 id
const activeModalId = ref(null);

// 편집 모달창 닫기
const closeEditModal = () => {
    emit('closeEdit');
}

// 문장 세트 삭제 함수
const deleteSentenceSet = async () => {
    const title = truncateString(props.sentenceSet.title, 15);
    const isDelete = window.confirm(title + "을/를 삭제하시겠습니까?");
    
    if (isDelete) {
        try {
            let res;
            if (!props.isReadOnly) {
                res = await instance.delete(`api/v1/sentence-set/${props.sentenceSet.id}`);
            } else if (isAdmin.value && props.isReadOnly) {
                res = await instance.delete(`api/v1/admin/sentence-set/${props.sentenceSet.id}`);
            }
            
            if (res.data.success) {
                // UserSentenceSetComponent에 삭제된 문장 세트 id 전달
                emit('deleteSentenceSet', props.sentenceSet.id);

                console.log(res.data.payload);
                window.alert('문장 세트가 삭제되었습니다.');

                closeEditModal();
            }
        } catch (error) {
            console.log(error);
            window.alert('문장 세트 삭제 중 에러가 발생했습니다.');
        }
    }
}

// 문장 세트 수정 모달창 열기
const openModifyModal = () => {
    activeModalId.value = props.sentenceSet.id;
}

// 문장 세트 수정 모달창 닫기
const closeModifyModal = () => {
    activeModalId.value = null;
    // 편집 모달창도 닫기
    closeEditModal();
}

// 문장 세트 수정 handle 함수
const modifyHandle = (modifiedSentenceSet) => {
    emit('modifySentenceSet', modifiedSentenceSet);
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
}

.close-modal:hover {
    color: black;
}

.modal-content {
    background: white;
    padding: 30px;
    position: relative;
    width: 10px;
    z-index: 1000;
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
