<template>
    <div class="container">  
        <div class="contents">
            <div class="content-header">
                <h2>개인 문장 세트</h2>
                <span class="content-count">총 문장 개수: {{ sentenceSetCount }}</span>
                <i class="fa-regular fa-square-plus content-add-button"></i>
            </div>
            <UserSentenceSetListComponent @sentenceSetCountReceived="handleSentenceSetCount" />
        </div>
    </div>
</template>
  
<script setup>
import UserSentenceSetListComponent from '@/components/features/my/UserSentenceSetListComponent.vue';
import { ref } from 'vue';

const sentenceSetCount = ref(0);

// 하위 컴포넌트에서 받아온 문장 세트 개수
const handleSentenceSetCount = (count) => {
    sentenceSetCount.value = count;
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
max-width: 50%;
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
