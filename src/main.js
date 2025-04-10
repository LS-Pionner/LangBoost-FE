import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/global.css";
import Cookies from 'js-cookie'; // js-cookie 라이브러리 import

const app = createApp(App);

app.use(router);
app.use(store);

// 쿠키에서 isAdmin 값을 읽어와 Vuex 상태 초기화
const isAdminCookie = Cookies.get('isAdmin');
const isAdmin = isAdminCookie === 'true';
store.commit('setAdmin', isAdmin);

store.dispatch("initAuthentication");

app.mount("#app");
