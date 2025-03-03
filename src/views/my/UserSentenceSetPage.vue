<template>
    <div class="container">  
        <div class="contents">
            <div class="content-header">
                <h2>개인 문장 세트</h2>
                <span class="content-count">총 문장 세트 개수: {{ sentenceSetCount }}</span>
                <i class="fa-regular fa-square-plus content-add-button" @click="openModal"></i>
            </div>
            <UserSentenceSetListComponent 
                @sentenceSetCountReceived="handleSentenceSetCount" 
                :newSentenceSet="addedSentenceSet"
            />
            <AddModalComponent 
                :isVisible="isVisible"
                @close="closeModal"
                @add="addSentenceSet"
            />
        </div>
    </div>
</template>
  
<script setup>
import instance from '@/axios';
import UserSentenceSetListComponent from '@/components/features/my/UserSentenceSetListComponent.vue';
import AddModalComponent from '@/components/UI/modals/AddModalComponent.vue';
import { ref } from 'vue';

const sentenceSetCount = ref(0);    // 문장 세트 개수
const isVisible = ref(false);  // 모달 오픈 여부
const addedSentenceSet = ref(null); // 부모 컴포넌트에서 관리되는 문장 세트 목록

// 하위 컴포넌트에서 받아온 문장 세트 개수
const handleSentenceSetCount = (count) => {
    sentenceSetCount.value = count;
}

const openModal = () => {
    isVisible.value = true;
}

const closeModal = () => {
    isVisible.value = false;
}

// 문장 세트 추가 함수
const addSentenceSet = async (name) => {
    try {
        const res = await instance.post("/api/v1/sentence-set", { 'title': name });
        console.log('>>>', res);

        if (res.data.success) {
            addedSentenceSet.value = res.data.payload;
            sentenceSetCount.value++;
        }
    } catch (error) {
        if (error) {
            window.alert(error.error.message);
        } else {
            window.alert('세트 생성에 실패했습니다.');
        }
    }


    closeModal();
}
</script>
  
<style scoped>
.container {
font-family: Arial, sans-serif;
background-color: #fafafa;
/* min-height: 100vh; */
display: flex;
flex-direction: column;
align-items: center;
}

.contents {
width: 100%;
max-width: 70%;
padding: 20px;
box-sizing: border-box;
margin-top: 50px;
}

.content-header {
    display: flex;
}

.content-count {
    align-content: center;
    margin-left: auto;
    margin-right: 20px;
    font-size: 14px;
    font-weight: 500;
}

.content-add-button {
    align-content: center;
    font-size: 32px;
}

.content-add-button::before {
    cursor: pointer;
}
</style>
