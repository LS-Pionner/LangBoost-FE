<template>
    <div class="modify-modal-overlay">
        <div class="modify-modal-content">
            <i class="fa-regular fa-circle-xmark close-modify-modal" @click="closeModifyModal"></i>
            <h3>세트 이름 변경</h3>
            <input 
                type="text"
                v-model="sentenceSetName"
                placeholder="문장 세트 이름"
            />
            <div class="modify-modal-buttons">
                <BlueButtonComponent @click="modifySentenceSet">변경</BlueButtonComponent>
                <WhiteButtonComponent @click="closeModifyModal">취소</WhiteButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import BlueButtonComponent from '../buttons/BlueButtonComponent.vue';
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import WhiteButtonComponent from '../buttons/WhiteButtonComponent.vue';
import instance from '@/axios';

const props = defineProps({
    sentenceSet: {
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

const emit = defineEmits(['closeModify', 'modifySentenceSet']);

const sentenceSetName = ref('');    // 변경할 문장 세트의 현재 이름

// 컴포넌트가 마운트될 때 문장 세트의 현재 title을 세팅
onMounted(() => {
    sentenceSetName.value = props.sentenceSet.title;
})

// 문장 세트 수정 모달창 닫기
const closeModifyModal = () => {
    emit('closeModify');
}

// 문장 세트 수정
const modifySentenceSet = async () => {
    if (sentenceSetName.value.trim() === '') {
        alert('변경할 문장 세트 이름을 입력해주세요.');
        return;
    }

    try {
        let res;
        if (!props.isReadOnly) {
            res = await instance.put(`/api/v1/sentence-set/${props.sentenceSet.id}`, {
            title: sentenceSetName.value
        });
        } else if (props.isAdmin && props.isReadOnly) {         
            res = await instance.put(`/api/v1/admin/sentence-set/${props.sentenceSet.id}`, {
            title: sentenceSetName.value
        });
        }

        if (res.data.success) {
            emit('modifySentenceSet', res.data.payload);
            window.alert('문장 세트가 수정되었습니다.');
            sentenceSetName.value = '';
            closeModifyModal();
        }
        
    } catch (error) {
        console.error("수정 중 오류 발생: ", error);
        window.alert('문장 세트 수정 중 오류가 발생했습니다.');
    }
}
</script>

<style scoped>
.modify-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 어두운 배경 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* ModifyModalComponent를 최상위에 표시하기 위함 */
}

.close-modify-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    transition: color 0.3s;
}

.close-modify-modal:hover {
    color: black;
}

.modify-modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 600px;
    position: relative;
    z-index: 10000;
}

.modify-modal-content h3 {
    margin-top: 0;
    color: #333;
    font-size: 20px;
}

.modify-modal-content input {
    width: 95%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.modify-modal-buttons {
    display: flex;
    justify-content: flex-end;
}

.modify-modal-content button {
    margin-left: 10px;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
}

</style>
