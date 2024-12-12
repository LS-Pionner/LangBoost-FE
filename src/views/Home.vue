<template>
  <div>
    <!-- 메인 콘텐츠 -->
    <div class="home-content">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
/* 메인 콘텐츠 스타일 */
.home-content {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #42b983;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
