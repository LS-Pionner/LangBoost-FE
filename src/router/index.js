import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import SentenceDetailView from "../views/SentenceDetailView.vue";
import Page from "../views/Page.vue";
import SignComponent from "@/components/Pages/auth/SignComponent.vue";
import AddSentence from "@/components/Pages/Sentences/AddSentence.vue";

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
  {
    path: "/new-sentence",
    name: "AddSentence",
    component: AddSentence,
  },
  {
    path: "/sign",
    name: "SignComponent",
    component: SignComponent,
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 히스토리 모드
  routes: routes,
});

export default router;
