<template>
  <div class="scroll-container">
    <!-- 좌측 화살표 버튼 -->
    <button class="scroll-button left" @click="scrollLeft">←</button>

    <!-- 스크롤 가능한 단어 리스트 -->
    <div class="word-box" ref="wordBox">
      <div
        class="word-item"
        v-for="(word, index) in words"
        :key="word.id"
        @click="toggleMeaning(index)"
      >
        <div class="word-content">
          <span v-if="!word.showMeaning">{{ word.word }}</span>
          <span v-else>{{ word.description }}</span>
        </div>
      </div>
    </div>

    <!-- 우측 화살표 버튼 -->
    <button class="scroll-button right" @click="scrollRight">→</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WordList",
  props: {
    // 부모 컴포넌트에서 전달된 sentenceId를 받아옵니다.
    sentenceId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      words: [], // 초기 words 리스트를 빈 배열로 설정
    };
  },
  methods: {
    toggleMeaning(index) {
      // Toggle the showMeaning flag for the clicked word
      this.words[index].showMeaning = !this.words[index].showMeaning;
    },
    scrollLeft() {
      // 스크롤 왼쪽으로 이동
      const box = this.$refs.wordBox;
      box.scrollBy({
        left: -150, // 한 번에 왼쪽으로 150px씩 스크롤
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    },
    scrollRight() {
      // 스크롤 오른쪽으로 이동
      const box = this.$refs.wordBox;
      box.scrollBy({
        left: 150, // 한 번에 오른쪽으로 150px씩 스크롤
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    },
    fetchWords() {
      console.log("API URL:", process.env.VUE_APP_SERVER_API_BASE_URL_V1);
      // 서버 환경 변수 설정
      const apiBaseURL = process.env.VUE_APP_SERVER_API_BASE_URL_V1;

      // sentenceId를 이용해 API 요청
      axios
        .get(`${apiBaseURL}/words/${this.sentenceId}`)
        .then((response) => {
          if (response.data.success) {
            // 응답 데이터를 words 배열에 할당하고 showMeaning 속성 추가
            this.words = response.data.payload.map((word) => ({
              ...word,
              showMeaning: false,
            }));
          } else {
            console.error("API 오류: ", response.data.error);
          }
        })
        .catch((error) => {
          console.error("데이터를 가져오는 중 오류 발생: ", error);
        });
    },
  },
  mounted() {
    // 컴포넌트가 마운트될 때 API에서 데이터를 가져옴
    this.fetchWords();
  },
  watch: {
    // sentenceId가 변경되면 fetchWords 재호출
    sentenceId: "fetchWords",
  },
};
</script>

<style scoped>
.scroll-container {
  display: flex;
  align-items: center;
}

.scroll-button {
  background-color: #ddd;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.scroll-button:hover {
  background-color: #ccc;
}

.word-box {
  display: flex;
  justify-content: flex-start;
  overflow-x: hidden; /* 스크롤바는 숨기고 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex-grow: 1;
  position: relative;
}

.word-item {
  width: 120px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.word-item:hover {
  background-color: #f0f0f0;
}

.word-content {
  font-size: 14px;
  color: #333;
}
</style>
