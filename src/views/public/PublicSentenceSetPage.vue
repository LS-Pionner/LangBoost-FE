<template>
    <div class="container">
        <div class="contents">
            <div class="content-header">
                <h2>공용 문장 세트</h2>
                <span class="content-count">총 문장 세트 개수: {{ sentenceSetCount }}</span>
                <i v-if="isAdmin" class="fa-regular fa-square-plus content-add-button" @click="openAddModal"></i>
            </div>
            <SentenceSetListComponent
                :isAdmin="isAdmin"
                :isReadOnly="true"
                :newSentenceSet="addedSentenceSet"
                @sentenceSetCountReceived="handleSentenceSetCount" 
            />
            <AddModalComponent 
                :isVisible="isVisible"
                @closeAdd="closeAddModal"
                @add="addSentenceSet"
            />
        </div>
    </div>
</template>
  
<script setup>
import { computed, ref } from 'vue';
import SentenceSetListComponent from '@/components/features/my/SentenceSetListComponent.vue';
import AddModalComponent from '@/components/UI/modals/AddModalComponent.vue';
import store from '@/store';
import instance from '@/axios';

const isAdmin = computed(() => store.state.isAdmin);    // 관리자 권한 여부
const isVisible = ref(false);  // 모달 오픈 여부
const sentenceSetCount = ref(0);    // 문장 세트 개수
const addedSentenceSet = ref(null); // 부모 컴포넌트에서 관리되는 문장 세트 목록

// 하위 컴포넌트에서 받아온 문장 세트 개수
const handleSentenceSetCount = (count) => {
    sentenceSetCount.value = count;
}

const openAddModal = () => {
    isVisible.value = true;
}

const closeAddModal = () => {
    isVisible.value = false;
}

// 공용 문장 세트 추가 함수
const addSentenceSet = async (name) => {
    try {
        const res = await instance.post("/api/v1/admin/sentence-set", { 'title': name });
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

    closeAddModal();
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
max-width: 40%;
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
