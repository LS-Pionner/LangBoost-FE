import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SentenceDetailView from "../views/SentenceDetailView.vue";
import Page from "../views/Page.vue";

const routes = [
  {
    path: "/", // URL 경로
    name: "Home", // 라우트 이름 (선택 사항)
    component: Home, // 연결할 컴포넌트
  },
  {
    path: "/sentence/:sentenceId",
    name: "SentenceDetailView",
    component: SentenceDetailView,
  },
  {
    path: "/sentences",
    name: "Page",
    component: Page,
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 히스토리 모드
  routes,
});

export default router;
