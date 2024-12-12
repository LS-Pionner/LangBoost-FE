<template>
    <div class="login-container">
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">이메일</label>
          <input v-model="email" type="email" id="email" placeholder="이메일 입력" required />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input v-model="password" type="password" id="password" placeholder="비밀번호 입력" required />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginComponent",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        // 로그인 로직 구현
        console.log("로그인 시도:", { email: this.email, password: this.password });
        // API 호출 예시
        // axios.post('/api/login', { email: this.email, password: this.password })
        //   .then(response => {
        //     console.log('로그인 성공:', response.data);
        //   })
        //   .catch(error => {
        //     console.error('로그인 실패:', error);
        //   });
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
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
  