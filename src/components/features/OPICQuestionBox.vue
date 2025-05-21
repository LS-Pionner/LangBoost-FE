<template>
  <div class="opic-box">
    <div class="question-container">
      <div class="question-header">
        <div class="english-question" @click="toggleTranslation">
          {{ currentQuestion.english }}
        </div>
        <i class="fas fa-volume-up speaker-icon" @click="speakQuestion"></i>
      </div>
      <div class="korean-translation" v-if="showTranslation">
        {{ currentQuestion.korean }}
      </div>
    </div>
    <div class="button-container">
      <button class="action-button random" @click="getRandomQuestion">
        <i class="fas fa-random"></i> 랜덤 질문
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 샘플 OPIC 질문 데이터
const questions = [
  {
    english: "What do you usually do on weekends?",
    korean: "주말에 보통 무엇을 하시나요?",
  },
  {
    english: "Describe your favorite place to visit.",
    korean: "가장 좋아하는 방문 장소를 설명해주세요.",
  },
  {
    english: "What is your dream job and why?",
    korean: "당신의 꿈꾸는 직업은 무엇이며, 그 이유는 무엇인가요?",
  },
  {
    english: "How do you usually spend your free time?",
    korean: "보통 여가 시간을 어떻게 보내시나요?",
  },
];

const currentQuestion = ref(questions[0]);
const showTranslation = ref(false);

// 랜덤 질문 가져오기
const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion.value = questions[randomIndex];
  showTranslation.value = false;
};

// 번역 토글
const toggleTranslation = () => {
  showTranslation.value = !showTranslation.value;
};

// TTS로 발음 듣기
const speakQuestion = () => {
  const utterance = new SpeechSynthesisUtterance(currentQuestion.value.english);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};
</script>

<style scoped>
.opic-box {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(33, 150, 243, 0.1); /* 파란색 그림자 */
}

.question-container {
  margin-bottom: 20px;
}

.question-header {
  position: relative;
}

.english-question {
  font-size: 24px;
  color: #333;
  padding: 20px;
  background-color: #e3f2fd; /* 연한 파란색 배경 */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding-right: 50px;
  border: 1px solid #bbdefb; /* 파란색 테두리 */
}

.english-question:hover {
  background-color: #bbdefb; /* 호버 시 더 진한 파란색 */
}

.speaker-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  color: #2196f3; /* 파란색 아이콘 */
  cursor: pointer;
  transition: transform 0.2s;
}

.speaker-icon:hover {
  transform: scale(1.1);
  color: #1976d2; /* 호버 시 더 진한 파란색 */
}

.korean-translation {
  margin-top: 10px;
  padding: 15px;
  background-color: #e8f5e9; /* 연한 초록색 배경 */
  border-radius: 8px;
  color: #2e7d32; /* 진한 초록색 텍스트 */
  font-size: 18px;
  border: 1px solid #c8e6c9; /* 초록색 테두리 */
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.random {
  background-color: #4caf50; /* 초록색 버튼 */
  color: white;
}

.random:hover {
  background-color: #388e3c; /* 호버 시 더 진한 초록색 */
}

.action-button:hover {
  transform: translateY(-2px);
}

.action-button i {
  font-size: 18px;
}
</style>
