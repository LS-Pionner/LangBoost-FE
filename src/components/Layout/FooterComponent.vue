<template>
  <footer class="footer">
    <nav>
      <ul class="footer-list">
        <!-- 'Contact Us' 버튼 추가 -->
        <li class="footer-item">
          <!-- 'Contact Us' 버튼을 클릭하면 '/contact'로 이동 -->
          <router-link to="/contact" class="footer-link"
            >Contact Us</router-link
          >
        </li>
        <!-- 'About' 버튼 -->
        <li class="footer-item">
          <!-- 'About' 버튼을 클릭하면 '/about'로 이동 -->
          <router-link to="/about" class="footer-link">About</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
/* 푸터 스타일 */
.footer {
  background-color: #1e90ff;
  padding: 15px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
}

.footer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.footer-item {
  margin: 0 10px;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.footer-link:hover {
  background-color: #4682b4;
}
</style>
