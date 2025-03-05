<template>
    <div class="add-sentence-container">
        <input v-model="sentence.sentence" placeholder="새 문장을 입력하세요"/>
        <input v-model="sentence.description" placeholder="설명을 입력하세요" @keyup.enter="addSentence"/>
        <button @click="addSentence">추가하기</button>
    </div>
</template>

<script setup>
import router from '@/router';
import axios from '@/axios';
import { reactive } from 'vue';

const sentence = reactive({
    sentence: "",
    description: "",
});

const addSentence = async () => {
    try {
        const res = await axios.post("/api/v1/sentence", sentence);
        console.log(res.data.payload);
        window.alert("문장이 추가되었습니다.");
        router.push({ path: "/sentences" });
    } catch (error) {
        if (error) {
            window.alert(error.error.message);
        } else {
            window.alert("문장 추가에 실패했습니다.");
        }
    }

}

</script>
<style scoped>
.add-sentence-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
    padding: 20px;
}
</style>