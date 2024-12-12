<template>
  <div class="signup-container">
    <h2>회원 가입</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="email">이메일</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="이메일 입력"
          required
        />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="비밀번호 입력"
          required
        />
      </div>
      <button type="submit">회원 가입</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      // 회원가입 로직 구현
      console.log("회원가입 시도:", {
        email: this.email,
        password: this.password,
      });
      // API 호출 예시
      // axios.post('/api/signup', { email: this.email, password: this.password })
      //   .then(response => {
      //     console.log('회원가입 성공:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('회원가입 실패:', error);
      //   });
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 15px;
}
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
