<template>
    <div class="add-sentence-container">
        <input v-model="sentence.sentence" placeholder="새 문장을 입력하세요"/>
        <input v-model="sentence.description" placeholder="설명을 입력하세요" @keyup.enter="addSentence"/>
        <button @click="addSentence">추가하기</button>
    </div>
</template>

<script>
import router from '@/router';
import axios from '@/axios';

export default {
  name: "AddSentence",
  data() {
    return {
        sentence: {
            sentence: "",
            description: "",
        },
    };
  },
  methods: {
    addSentence() {
        axios.post("/api/v1/sentence", this.sentence).then((res) => {
            console.log(res.data.payload);
            window.alert("문장이 추가되었습니다.");
            router.push({ path: "/sentences" });
        }).catch((error) => {
            if (error.response && error.response.data) {
                window.alert(error.response.data.error.message);
            } else {
                window.alert("문장 추가에 실패했습니다.");
            }
        });
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