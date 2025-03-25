<template>
    <div class="container">  
        <div class="contents">
            <div class="content-header">
                <h2>{{ sentenceSet?.title }}</h2>
            </div>
            <div class="content-header-items">
                <div class="content-header-learning">
                    <button class="learning-item">전체</button>
                    <button class="learning-item">학습중</button>
                    <button class="learning-item">학습완료</button>
                </div>
                <div class="content-header-edit">
                    <button class="edit-item">토글</button>
                    <button class="edit-item">편집</button>
                </div>
            </div>
            <UserSentenceListComponent 
                :sentenceSetId="sentenceSetId"
                @sentenceSetRecieved="handleSentenceSetReceived"
            />
        </div>
    </div>
</template>

<script setup>
import UserSentenceListComponent from '@/components/features/sentence/UserSentenceListComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 동적 라우팅 시 받아오는 문장 세트 id
const sentenceSetId = Number(route.params.sentenceSetId);

const sentenceSet = ref(null);  // 하위 컴포넌트로부터 받아온 문장 세트

const handleSentenceSetReceived = (sentenceSetData) => {
    sentenceSet.value = sentenceSetData;
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

.content-header-items {
    display: flex;
}

.content-header-learning {
    position: relative;
    margin-right: auto;
}

.learning-item {
    padding: 3px;
    margin: 0 5px;
}

.content-header-edit {
    margin-left: auto;
}

.edit-item {
    position: relative;
    padding: 3px;
    margin: 0 5px;
}
</style>