import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import HomeView from "@/views/HomeView.vue";
// import SentenceDetailPage from "@/views/sentences/SentenceDetailPage.vue";
// import SentenceSetPage from "@/views/sentences/SentenceSetPage.vue";
import SignComponent from "@/views/auth/SignComponent.vue";
import PublicSentenceSetPage from "@/views/public/PublicSentenceSetPage.vue";
import UserSentenceSetPage from "@/views/my/UserSentenceSetPage.vue";

const routes = [
  {
    path: "/", // URL 경로
    name: "HomePage", // 라우트 이름 (선택 사항)
    component: HomePage, // 연결할 컴포넌트
  },
  {
    path: "/test", // URL 경로
    name: "HomeView", // 라우트 이름 (선택 사항)
    component: HomeView, // 연결할 컴포넌트
  },
  // {
  //   path: "/public/sentence-set/:sentenceId",
  //   name: "SentenceDetailPage",
  //   component: SentenceDetailPage,
  // },
  {
    path: "/public/sentence-set/list",
    name: "PublicSentenceSetPage",
    component: PublicSentenceSetPage,
  },
  {
    path: "/my/sentence-set/list",
    name: "UserSentenceSetPage",
    component: UserSentenceSetPage,
  },
  // {
  //   path: "/sentences",
  //   name: "SentenceSetPage",
  //   component: SentenceSetPage,
  // },
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
