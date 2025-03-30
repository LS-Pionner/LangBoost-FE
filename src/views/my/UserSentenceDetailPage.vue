<template>
    <div class="container">  
        <div class="header">
            <div class="header-item left">
                <BlueButtonComponent @click="goBack">세트로 돌아가기</BlueButtonComponent>
            </div>
            <div class="header-item right">
                <i class="fa-solid fa-volume-high item-button"></i>
                <i class="fa-solid fa-pen-to-square item-button"></i>
            </div>
        </div>
        <div class="contents">
            <div class="contents-element">
                <h1>영어 문장</h1>
                <div class="sentence-content">
                    {{ detailSentence.content }}
                </div>
            </div>
            <div class="contents-element">
                <h1>한국어 문장</h1>
                <div class="sentence-meaning">
                    {{ detailSentence.meaning }}
                </div>
            </div>
            <div class="contents-element">
                <h1>설명</h1>
                <div class="sentence-description">
                    {{ detailSentence.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BlueButtonComponent from '@/components/UI/buttons/BlueButtonComponent.vue';
import router from '@/router';
import store from '@/store';
import { computed } from 'vue';

// 상세 페이지에서 보여줄 문장 객체
const detailSentence = computed(() => store.state.detailSentence);

// 이전 페이지로 이동
const goBack = () => {
    router.back();
}

</script>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 0 30%;
    margin-top: 30px;
}

.header-item {
    display: flex;
    align-items: center;
}

.header-item.left {
    margin-left: 30%;
}

.header-item.right {
    margin-left: auto;
    margin-right: 30%;
}

.item-button {
    font-size: 26px;
    margin: 0 15px;
}

.item-button:hover {
    cursor: pointer;
}

.contents {
    width: 100%;
    max-width: 40%;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 50px;
}

.contents-element {
    margin-bottom: 20%;
}

.sentence-content,
.sentence-meaning,
.sentence-description {
    font-size: 24px;
    margin-top: 10px;
}

</style>
