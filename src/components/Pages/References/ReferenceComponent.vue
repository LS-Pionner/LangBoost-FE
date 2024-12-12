<template>
  <div class="reference-container">
    <div v-if="reference">
      <h3>Reference for Sentence {{ reference.sentenceId }}</h3>
      <a :href="reference.url" target="_blank">{{ reference.url }}</a>
    </div>
    <div v-else>
      <p>Loading reference...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReferenceComponent",
  props: {
    // 부모 컴포넌트에서 전달된 sentenceId를 받음
    sentenceId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reference: null, // 초기 reference 데이터를 null로 설정
    };
  },
  methods: {
    fetchReference() {
      // 서버 환경 변수 설정
      console.log("API URL:", process.env.VUE_APP_SERVER_API_BASE_URL_V1);
      const apiBaseURL = process.env.VUE_APP_SERVER_API_BASE_URL_V1;

      // 부모 컴포넌트에서 받은 sentenceId를 이용하여 API 요청
      axios
        .get(`${apiBaseURL}/reference/sentence/${this.sentenceId}`)
        .then((response) => {
          if (response.data.success) {
            this.reference = response.data.payload;
          } else {
            console.error("API 오류: ", response.data.error);
          }
        })
        .catch((error) => {
          console.error("데이터를 가져오는 중 오류 발생: ", error);
        });
    },
  },
  watch: {
    // sentenceId가 변경될 때마다 새로운 레퍼런스를 가져옴
    sentenceId: "fetchReference",
  },
  mounted() {
    // 컴포넌트가 마운트될 때 fetchReference 호출
    this.fetchReference();
  },
};
</script>

<style scoped>
.reference-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin: 10px 0;
}

h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

a {
  color: #1e90ff;
  text-decoration: none;
  font-size: 16px;
}

a:hover {
  text-decoration: underline;
}
</style>
