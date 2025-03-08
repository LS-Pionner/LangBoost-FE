<template>
  <div id="wrapper">
    <main class="content" @scroll="handleScroll">
      <!-- 페이지 콘텐츠 -->
    </main>

    <footer :class="{ hidden: isAtTop }">
      <div class="footer">
        <div class="content">
          <div class="logo">
            <CompanyLogo class="company-logo" />
          </div>
        </div>

        <div class="credits">
          <div class="divider"></div>
          <div class="div">
            <p class="p">© 2025 LangBoost. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import CompanyLogo from "@/components/UI/CompanyLogo.vue";
import { ref } from "vue";

const isAtTop = ref(false);

// 페이지 스크롤이 맨 위일 때 푸터를 숨기는 함수
const handleScroll = (event) => {
  const scrollTop = event.target.scrollTop;
  isAtTop.value = scrollTop === 0; // 페이지 스크롤이 맨 위일 때
};
</script>

<style scoped>
/* 전체 레이아웃을 flex로 설정하여 푸터를 하단에 위치시킴 */
#wrapper {
  display: flex;
  flex-direction: column;
  z-index: -10000;
  /* min-height: 100vh; 전체 화면의 높이를 차지하게 설정 */
}

main.content {
  flex-grow: 1; /* 콘텐츠 영역이 남는 공간을 차지하게 하고, 푸터를 아래로 밀어냄 */
  overflow-y: auto; /* main 영역에서 스크롤 가능하게 설정 */
  padding-bottom: 80px; /* 푸터 공간을 고려한 여백 추가 */
}

/* 푸터 스타일 설정 */
footer {
  background-color: var(--semantic-background-color-primary);
  display: flex;
  flex-direction: column;
  padding: 40px 64px;
  width: 100%;
  margin-top: auto; /* 푸터가 화면 하단으로 밀리도록 설정 */
  position: relative; /* 푸터가 페이지 하단에 고정되도록 설정 */
}

/* 푸터 숨기기 스타일 */
footer.hidden {
  display: none;
}

/* PC에서 푸터 스타일 */
@media (min-width: 769px) {
  footer {
    padding: 20px 32px;
  }

  .footer .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .footer .credits {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .footer .divider {
    width: 100%;
    height: 1px;
    background-color: var(--semantic-border-primary);
  }

  .footer .div {
    display: flex;
    gap: 24px;
  }

  .footer .p {
    color: var(--semantic-text-primary);
    font-size: 14px;
  }

  .footer .text-wrapper-2 {
    color: var(--semantic-link-primary);
    text-decoration: underline;
    font-size: 14px;
  }

  .footer .navbar,
  .footer .social-links {
    display: none; /* PC에서 navbar와 social-links를 숨김 */
  }
}

/* 모바일 화면에서만 푸터를 간소화하여 보이게 설정 */
@media (max-width: 768px) {
  footer {
    padding: 20px 16px;
  }

  .footer .credits {
    gap: 8px;
  }

  .footer .p {
    font-size: 12px;
  }

  .footer .divider {
    margin-top: 20px;
  }
}
</style>
