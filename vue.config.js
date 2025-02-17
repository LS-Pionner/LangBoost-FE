const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000, // 개발 서버 포트를 3000으로 설정
  },
  configureWebpack: {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'), // http 모듈 폴리필 추가
      },
    },
  },
});
