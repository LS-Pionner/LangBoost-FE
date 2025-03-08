import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setAdmin(state, status) {
      state.isAdmin = status;
      localStorage.setItem('isAdmin', JSON.stringify(status)); // 상태를 로컬 스토리지에 저장
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
  actions: {
    initAuthentication({ commit }) {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        commit("setAuthentication", true);
      } else {
        commit("setAuthentication", false);
      }
    },
    initAdmin({ commit }, status) {
      commit("setAdmin", status);
    },
    logout({ commit }) {
      localStorage.removeItem("accessToken");
      commit("logout");
    },
  },
});