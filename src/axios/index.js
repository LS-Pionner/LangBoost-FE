import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081", // 기본 URL 경로
})

export default instance;