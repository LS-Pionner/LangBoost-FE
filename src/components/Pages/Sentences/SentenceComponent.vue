<template>
  <div class="sentence-container">
    <div class="sentence-box">
      <p>{{ sentence.text }}</p>
    </div>
    <div class="description-box" @click="toggleDescription">
      <p>
        {{
          isDescriptionVisible
            ? sentence.description
            : "클릭을 하면 설명이 보입니다."
        }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SentenceComponent",
  props: {
    sentenceId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sentence: {
        text: "문장을 불러오는 중...",
        description: "",
      },
      isDescriptionVisible: false,
    };
  },
  methods: {
    toggleDescription() {
      this.isDescriptionVisible = !this.isDescriptionVisible;
    },
    fetchSentence(id) {
      console.log("API URL:", process.env.VUE_APP_SERVER_API_BASE_URL_V1);
      // 서버 환경 변수 설정
      const apiBaseURL = process.env.VUE_APP_SERVER_API_BASE_URL_V1;

      // API 요청
      axios
        .get(`${apiBaseURL}/sentence/${id}`)
        .then((response) => {
          if (response.data.success) {
            this.sentence = {
              text: response.data.payload.sentence,
              description: response.data.payload.description,
            };
          }
        })
        .catch((error) => {
          console.error("Error fetching sentence:", error);
        });
    },
  },
  mounted() {
    // id로 문장을 불러오기
    this.fetchSentence(this.sentenceId);
  },
};
</script>

<style scoped>
.sentence-container {
  width: 300px;
  margin: 20px auto;
}

.sentence-box,
.description-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.sentence-box {
  background-color: #f0f0f0;
}

.description-box {
  background-color: #fafafa;
  cursor: pointer;
}

.description-box p {
  margin: 0;
}

.description-box:hover {
  background-color: #e0e0e0;
}
</style>
