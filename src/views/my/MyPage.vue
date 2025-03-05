<template>
  <div class="my-page">
    <div class="my-page-header">
      <h1>마이 페이지</h1>
    </div>

    <hr class="divider" />

    <div class="user-info">
      <p class="email">
        이메일: <span>{{ userEmail }}</span>
      </p>

      <div class="password-reset-links">
        <router-link to="/change-password" class="reset-link">
          비밀번호 바꾸기
        </router-link>
        <router-link to="/reset-password" class="reset-link">
          비밀번호 재발급
        </router-link>
      </div>
    </div>

    <div class="user-stats">
      <div class="stat-item">
        <p>
          회원이 만든 문장 세트 개수: <span>{{ userSentenceSetsCount }}</span>
        </p>
      </div>
      <div class="stat-item">
        <p>
          회원이 만든 총 문장 개수: <span>{{ userSentencesCount }}</span>
        </p>
      </div>
      <div class="stat-item">
        <p>
          회원이 만든 총 문장 학습 중: <span>{{ userLearningCount }}</span>
        </p>
      </div>
      <div class="stat-item">
        <p>
          회원이 만든 총 문장 학습 완료: <span>{{ userCompletedCount }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "user@example.com", // 예시 이메일, 실제 데이터는 서버에서 받아와야 합니다
      userSentenceSetsCount: 5, // 예시 문장 세트 개수
      userSentencesCount: 25, // 예시 문장 개수
      userLearningCount: 10, // 예시 학습 중 문장 개수
      userCompletedCount: 15, // 예시 학습 완료 문장 개수
    };
  },
};
</script>

<style scoped>
.my-page {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.my-page-header {
  text-align: left;
  margin-bottom: 10px;
}

.my-page-header h1 {
  color: #35abff;
  font-size: 2.5rem;
  font-weight: 600;
}

.divider {
  border: 1px solid #dedee2;
  margin: 20px 0;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
}

.email {
  font-size: 18px;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.password-reset-links {
  display: flex;
  flex-direction: column; /* Arrange links vertically */
  gap: 10px; /* Space between the links */
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.reset-link {
  font-size: 14px;
  color: black;
  text-decoration: none;
}

.reset-link:hover {
  text-decoration: underline;
}

.user-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
}

.stat-item {
  background-color: #dedee2;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.stat-item p {
  font-size: 1.1rem;
  color: #333;
}

.stat-item span {
  font-weight: 600;
  color: #35abff;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
