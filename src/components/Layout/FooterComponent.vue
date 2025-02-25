<template>
  <div class="footer">
    <div class="content">
      <div class="logo">
        <CompanyLogo class="company-logo" />
      </div>

      <div class="navbar">
        <!-- <div class="text-wrapper">About Us</div>
        <div class="text-wrapper">Contact Us</div>
        <div class="text-wrapper">Help Center</div>
        <div class="text-wrapper">Blog Posts</div>
        <div class="text-wrapper">Language Tips</div> -->
      </div>

      <div class="social-links"></div>
    </div>

    <div class="credits">
      <div class="divider" />
      <div class="div">
        <p class="p">© 2025 LangBoost. All rights reserved.</p>
        <div class="text-wrapper-2">Privacy Policy</div>
        <div class="text-wrapper-2">Terms of Use</div>
        <div class="text-wrapper-2">Cookie Settings</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CompanyLogo from "@/components/UI/CompanyLogo.vue";
</script>

<style>
.footer {
  align-items: center;
  background-color: var(--semantic-background-color-primary);
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 80px 64px;
  position: relative;
  width: 1440px;
}

.footer .content {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 32px;
  position: relative;
  width: 100%;
}

.footer .logo {
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
  position: relative;
}

.footer .company-logo {
  height: 36px !important;
  position: relative !important;
  width: 84px !important;
}

.footer .navbar {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 32px;
  position: relative;
}

.footer .text-wrapper {
  color: var(--semantic-link-primary);
  font-family: var(--text-small-semi-bold-font-family);
  font-size: var(--text-small-semi-bold-font-size);
  font-style: var(--text-small-semi-bold-font-style);
  font-weight: var(--text-small-semi-bold-font-weight);
  letter-spacing: var(--text-small-semi-bold-letter-spacing);
  line-height: var(--text-small-semi-bold-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.footer .social-links {
  align-items: center;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 12px;
  justify-content: flex-end;
  position: relative;
}

.footer .credits {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 100%;
}

.footer .divider {
  align-self: stretch;
  background-color: var(--semantic-border-primary);
  border: 1px solid;
  border-color: var(--semantic-border-primary);
  height: 1px;
  position: relative;
  width: 100%;
}

.footer .div {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 24px;
  position: relative;
}

.footer .p {
  color: var(--semantic-text-primary);
  font-family: var(--text-small-normal-font-family);
  font-size: var(--text-small-normal-font-size);
  font-style: var(--text-small-normal-font-style);
  font-weight: var(--text-small-normal-font-weight);
  letter-spacing: var(--text-small-normal-letter-spacing);
  line-height: var(--text-small-normal-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.footer .text-wrapper-2 {
  color: var(--semantic-link-primary);
  font-family: var(--text-small-link-font-family);
  font-size: var(--text-small-link-font-size);
  font-style: var(--text-small-link-font-style);
  font-weight: var(--text-small-link-font-weight);
  letter-spacing: var(--text-small-link-letter-spacing);
  line-height: var(--text-small-link-line-height);
  margin-top: -1px;
  position: relative;
  text-decoration: underline;
  white-space: nowrap;
  width: fit-content;
}
</style>
