import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SentenceDetailPage from "@/views/SentenceDetailPage.vue";
import SentenceSetPage from "@/views/SentenceSetPage.vue";
import SignComponent from "@/views/auth/SignComponent.vue";
import AddSentence from "@/components/pages/sentences/AddSentence.vue";
import PublicSentenceSetPage from "@/views/public/PublicSentenceSetPage.vue";

const routes = [
  {
    path: "/", // URL 경로
    name: "HomePage", // 라우트 이름 (선택 사항)
    component: HomePage, // 연결할 컴포넌트
  },
  {
    path: "/public/sentence-set/:sentenceId",
    name: "SentenceDetailPage",
    component: SentenceDetailPage,
  },
  {
    path: "/public/sentence-set/list",
    name: "PublicSentenceSetPage",
    component: PublicSentenceSetPage
  },
  {
    path: "/sentences",
    name: "SentenceSetPage",
    component: SentenceSetPage,
  },
  {
    path: "/new-sentence",
    name: "AddSentence",
    component: AddSentence,
  },
  {
    path: "/sign",
    name: "SignComponent",
    component: SignComponent    
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 히스토리 모드
  routes: routes,
});

export default router;
