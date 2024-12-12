<template>
  <div class="auth-status-container">
    <h1>Vue 로그인 상태 예제</h1>

    <div v-if="isLoggedIn">
      <p>환영합니다, {{ email }}님!</p>
    </div>
    <div v-else>
      <p>로그인이 필요합니다.</p>
      <button @click="goToLogin">로그인</button>
      <button @click="goToSignup">회원 가입</button>
    </div>

    <button v-if="isLoggedIn" @click="toggleLogin">로그아웃</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "AuthStatusComponent",
  data() {
    return {
      isLoggedIn: false,
      email: "user@example.com", // 예시 이메일
    };
  },
  methods: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    goToLogin() {
      this.$router.push({ name: "Login" }); // 로그인 페이지로 이동
    },
    goToSignup() {
      this.$router.push({ name: "Signup" }); // 회원 가입 페이지로 이동
    },
  },
};
</script>

<style scoped>
.auth-status-container {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
