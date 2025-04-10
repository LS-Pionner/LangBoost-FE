<template>
    <div class="container">  
        <div class="header">
            <div class="header-item left">
                <BlueButtonComponent @click="goBack">세트로 돌아가기</BlueButtonComponent>
            </div>
            <div class="header-item right">
                <i class="fa-solid fa-volume-high item-button"></i>
                <i class="fa-solid fa-pen-to-square item-button" @click="setEditMode"></i>
            </div>
        </div>
        <div class="contents">
            <div class="contents-element">
                <h1>영어 문장</h1>
                <div class="sentence-content">
                    <input v-if="isEditMode" v-model="editSentence.content" type="text">
                    <span v-else>{{ detailSentence.content }}</span>
                </div>
            </div>
            <div class="contents-element">
                <h1>한국어 문장</h1>
                <div class="sentence-meaning">
                    <input v-if="isEditMode" v-model="editSentence.meaning" type="text">
                    <span v-else>{{ detailSentence.meaning }}</span>
                </div>
            </div>
            <div class="contents-element">
                <h1>설명</h1>
                <div class="sentence-description">
                    <input v-if="isEditMode" v-model="editSentence.description" type="text">
                    <span v-else>{{ detailSentence.description }}</span>
                </div>
            </div>
            <div v-if="isEditMode">
                <BlueButtonComponent @click="saveEditSentence">저장</BlueButtonComponent>
                <WhiteButtonComponent @click="cancelEditSentence">취소</WhiteButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup>
import instance from '@/axios';
import BlueButtonComponent from '@/components/UI/buttons/BlueButtonComponent.vue';
import WhiteButtonComponent from '@/components/UI/buttons/WhiteButtonComponent.vue';
import router from '@/router';
import store from '@/store';
import { computed, ref } from 'vue';

const detailSentence = computed(() => store.state.detailSentence);  // 상세 페이지에서 보여줄 문장 객체
const isEditMode = ref(false);  // 문장 정보 수정 여부

const editSentence = ref({...detailSentence.value});

// 이전 페이지로 이동
const goBack = () => {
    router.back();
}

// 문장 수정 모드
const setEditMode = () => {
    isEditMode.value = true;
    editSentence.value = JSON.parse(JSON.stringify(detailSentence.value));
}

// 수정된 문장 저장 함수
const saveEditSentence = async () => {
    try{
        const res = await instance.put(`/api/v1/sentence-set/sentence/${detailSentence.value.id}`,
            { 
                content: editSentence.value.content,
                meaning: editSentence.value.meaning,
                description: editSentence.value.description
            }
        );

        if (res.data.success) {
            window.alert('문장이 수정되었습니다.');
            store.dispatch("updateDetailSentence", editSentence.value);
            cancelEditSentence();
        }
    } catch (error) {
        console.log(error);
        window.alert('문장 수정 중 에러가 발생했습니다.');
    }
}

// 수정 취소 함수
const cancelEditSentence = () => {
    isEditMode.value = false;
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

input {
  width: 500px;
  height: 32px;
  font-size: 20px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
}

</style>
