<template>
  <div class="scrollable-container" @scroll="handleScroll">
    <div class="sentence-container">
      <div
        v-for="sentence in sentences"
        :key="sentence.id"
        class="sentence-item"
        @click="toggleMeaning(sentence.id)"
      >
        <div class="sentence-header">
          <h3>{{ sentence.sentence }}</h3>
          <button
            class="details-button"
            @click.stop="navigateToSentence(sentence.id)"
          >
            세부
          </button>
        </div>
        <p v-if="visibleMeaningId === sentence.id" class="meaning">
          {{ sentence.description }}
        </p>
        <p class="last-viewed">Last viewed: {{ sentence.lastViewedDate }}</p>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: "InfiniteScrollSentences",
  data() {
    return {
      sentences: [], // API에서 가져온 문장 목록
      page: 0, // 현재 페이지 번호
      pageSize: 10, // 한 페이지에서 가져올 데이터 수
      loading: false, // 데이터 로딩 상태
      isLastPage: false, // 마지막 페이지 여부
      visibleMeaningId: null, // 의미를 보여줄 문장의 ID (초기 값은 null)
    };
  },
  methods: {
    fetchSentences() {
      // API에서 문장 데이터를 가져오는 함수
      if (this.isLastPage || this.loading) return;

      axios
        .get(`api/v1/sentences?page=${this.page}`) // 문자열 보간법을 사용하여 URL 설정
        .then((response) => {
          if (response.data.success) {
            const data = response.data.payload;
            this.sentences = [...this.sentences, ...data.content];
            this.isLastPage = data.isLast;
            this.page += 1;
          } else {
            console.error("API 오류: ", response.data.error);
          }
        })
        .catch((error) => {
          console.error("데이터를 가져오는 중 오류 발생: ", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 스크롤이 아래로 내려갔을 때 데이터 로드를 트리거하는 함수
    handleScroll(event) {
      const container = event.target;
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 10
      ) {
        this.fetchSentences();
      }
    },

    toggleMeaning(id) {
      // 문장 박스를 클릭했을 때 의미를 토글
      this.visibleMeaningId = this.visibleMeaningId === id ? null : id;
    },
    navigateToSentence(id) {
      const frontendBaseURL = process.env.VUE_APP_FRONTEND_BASE_URL;
      // 문장 박스를 클릭하면 특정 URL로 이동
      window.location.href = `${frontendBaseURL}/sentence/${id}`; // 문자열 보간법을 사용하여 URL 설정
    },
  },
  mounted() {
    // 컴포넌트가 마운트될 때 초기 데이터 로드
    this.fetchSentences();
  },
};
</script>

<style scoped>
.scrollable-container {
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.sentence-container {
  max-width: 600px;
  margin: 0 auto;
}

.sentence-item {
  position: relative;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.sentence-item:hover {
  background-color: #ececec;
}

.sentence-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details-button {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #0056b3;
}

.sentence-item h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.meaning {
  margin: 10px 0;
  font-size: 14px;
  color: #555;
}

.last-viewed {
  font-size: 12px;
  color: #999;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}
</style>
