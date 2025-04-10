import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SignComponent from "@/views/auth/SignComponent.vue";
import PublicSentenceSetPage from "@/views/public/PublicSentenceSetPage.vue";
import UserSentenceSetPage from "@/views/my/UserSentenceSetPage.vue";
import MyPage from "@/views/my/MyPage.vue";
import UserSentenceListPage from "@/views/my/UserSentenceListPage.vue";
import PublicSentenceListPage from "@/views/public/PublicSentenceListPage.vue";
import UserSentenceDetailPage from "@/views/my/UserSentenceDetailPage.vue";

const routes = [
  {
    path: "/", // URL 경로
    name: "HomePage", // 라우트 이름 (선택 사항)
    component: HomePage, // 연결할 컴포넌트
  },
  {
    path: "/public-sentences",
    name: "PublicSentenceSetPage",
    component: PublicSentenceSetPage,
  },
  {
    path: "/private-sentences",
    name: "UserSentenceSetPage",
    component: UserSentenceSetPage,
  },
  {
    path: "/public-sentences/:sentenceSetId",
    name: "PublicSentenceListPage",
    component: PublicSentenceListPage,
  },
  {
    path: "/private-sentences/:sentenceSetId",
    name: "UserSentenceListPage",
    component: UserSentenceListPage,
  },
  {
    path: "/private-sentences/detail",
    name: "UserSentenceDetailPage",
    component: UserSentenceDetailPage
  },
  {
    path: "/sign",
    name: "SignComponent",
    component: SignComponent,
  },
  {
    path: "/mypage",
    name: "MyPage", // Fix the name here, remove quotes
    component: MyPage, // Use the imported component
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 히스토리 모드
  routes: routes,
});

export default router;
