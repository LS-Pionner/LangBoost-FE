<template>
  <div :class="['container', { 'right-panel-active': isActive }]">
    <!-- 회원가입 컨테이너 -->
    <div class="form-container sign-up-container">
      <div class="sign-form">
        <h1>Create Account</h1>
        <span>type your email for registration</span>
        <div class="email-container">
          <input type="email" class="email" placeholder="Type your Email" v-model="registerForm.form.email" />
          <button class="duplicate-check" @click="emailCheck()">중복 확인</button>
        </div>
        <small v-if="registerForm.message" :class="{'text-available': registerForm.messageType === 'available', 'text-unusable': registerForm.messageType === 'unusable'}">{{ registerForm.message }}</small>
        <input type="password" class="password" placeholder="******" v-model="registerForm.form.password" />
        <input type="password" class="password-confirm" placeholder="******" v-model="registerForm.form.passwordConfirm" />
        <small v-if="!isCorrect" class="text-unusable">비밀번호가 일치하지 않습니다.</small>
        <button @click="register()">Sign up</button>
      </div>
    </div>
    <!-- 로그인 컨테이너 -->
    <div class="form-container sign-in-container">
      <div class="sign-form">
        <h1>Sign in</h1>
        <span>Type your account</span>
        <input type="email" placeholder="Email" @keyup.enter="login()" v-model="loginForm.form.username" />
        <input type="password" placeholder="******" @keyup.enter="login()" v-model="loginForm.form.password" />
        <a href="#">Forgot your password?</a>
        <button @click="login()">Sign in</button>
      </div>
    </div>
    <!-- 패널 변경 컨테이너 -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome back!</h1>
          <p>To keep connected with us, please sign in</p>
          <button class="ghost" @click="activePanel(false)">Sign in</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Use our service for free!</p>
          <button class="ghost" @click="activePanel(true)">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import store from '@/store';
import axios from '@/axios';
import { computed, reactive, ref, watchEffect } from 'vue';

export default {
  name: "SignComponent",
  setup() {
    const isAuthenticated = computed(() => store.state.isAuthenticated);  // 인증 상태
    const isActive = ref(false);  // 패널 상태
    const isCorrect = ref(true);  // 비밀번호 일치 여부 상태

      // 패널 상태 변경 함수
    const activePanel = (status) => {
      isActive.value = status;
    }
    
    // 비밀번호 일치 여부 확인
    const correctPassword = (status) => {
      isCorrect.value = status;
    }

    const loginForm = reactive({
      form: {
        username: "",
        password: ""
      }
    });

    const registerForm = reactive({
      form: {
        email: "",
        password: "",
        passwordConfirm: "",
      },
      message: "",
      messageType: "",
    });

    // 로그인 한 사용자가 다시 로그인 할 수 없도록 라우팅
    watchEffect(() => {
      if (isAuthenticated.value) {  // 이미 인증된 사용자는 홈으로 라우팅
        router.push({ path: "/" });
      }
    });

    // 로그인 API 호출
    const login = () => {
      const isFormFilled = loginForm.form.username && loginForm.form.password;

      if (!isFormFilled) {
        window.alert("모든 필드를 채워주세요.");
        return;
      }

      axios.post("/api/v1/login", loginForm.form).then((res) => {
        const authorizationHeader = res.headers['authorization'];
        const accessToken = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          store.dispatch("initAuthentication");
          router.push({ path: "/" }); // 메인 페이지로 이동
        } else {
          window.alert("유효하지 않은 토큰입니다.");
        }

      }).catch((error) => {
        if (error.response && error.response.data) {
          window.alert(error.response.data.error.message);
        } else {
          window.alert("로그인에 실패했습니다.");
        }
      });
    };

    // 회원가입 API 호출
    const register = () => {
      correctPassword(true);
      const isFormFilled = registerForm.form.email && registerForm.form.password &&
          registerForm.form.passwordConfirm;

      if (!isFormFilled) {
        window.alert("모든 필드를 채워주세요.");
        return;
      }

      // 비밀번호 일치 여부 확인
      if (registerForm.form.password !== registerForm.form.passwordConfirm) {
        correctPassword(false);
        return;
      }

      axios.post("/api/v1/register", registerForm.form).then((res) => {
        correctPassword(true);
        window.alert(res.data.payload);
        registerForm.message = "";
        registerForm.messageType = "";
        // 로그인 탭으로 변경
        activePanel(false);
      }).catch((error) => {
        if (error.response && error.response.data) {
          window.alert(error.response.data.error.message);
          registerForm.messageType = "unusable";
        } else {
          window.alert("사용할 수 없는 이메일입니다.");
          registerForm.messageType = "unusable";
        }
      });
    };

    return {
      isAuthenticated,
      isActive,
      isCorrect,
      activePanel,
      correctPassword,
      loginForm,
      registerForm,
      login,
      register,
    };
  },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

.sign-form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
}

.duplicate-check {
  border: 1px solid #FF416C;
  background-color: #FF416C;
}

.text-available {
  color: rgb(51, 51, 253);
}

.text-unusable {
  color: #FF4B2B;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 75%;
}

.email {
  flex-grow: 1;
  margin-right: 10px;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  min-height: 100vh;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #FF416C;
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
    transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>