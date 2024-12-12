<template>
  <header class="navbar">
    <nav>
      <ul class="nav-list">
        <!-- 'Home' 버튼 추가 -->
        <li class="nav-item">
          <!-- 'Home' 버튼을 클릭하면 '/'로 이동 -->
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <!-- 'Sentences' 버튼 -->
        <li class="nav-item">
          <!-- 'Sentences' 버튼을 클릭하면 '/sentences'로 이동 -->
          <router-link to="/sentences" class="nav-link">Sentences</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
/* 네비게이션 바 스타일 */
.navbar {
  background-color: #1e90ff;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.nav-item {
  margin: 0 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #4682b4;
}
</style>
