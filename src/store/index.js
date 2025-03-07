import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    isAdmin: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setAdmin(state, status) {
      state.isAdmin = status;
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