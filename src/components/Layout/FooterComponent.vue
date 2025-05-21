<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="logo">
        <CompanyLogo class="company-logo" />
      </div>
      <div class="credits">
        <div class="divider"></div>
        <p>© 2025 LangBoost. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import CompanyLogo from "@/components/UI/CompanyLogo.vue";
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-top: auto;
  width: 100%;
  border-top: 1px solid #e9ecef;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.logo {
  display: flex;
  justify-content: center;
}

.company-logo {
  height: 40px;
}

.credits {
  text-align: center;
  width: 100%;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e9ecef;
  margin-bottom: 20px;
}

p {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .footer {
    padding: 15px 0;
  }

  .footer-content {
    padding: 0 15px;
  }

  .company-logo {
    height: 30px;
  }

  p {
    font-size: 12px;
  }
}
</style>
