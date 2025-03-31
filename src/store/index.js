import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    isAdmin: false,
    detailSentence: JSON.parse(localStorage.getItem('detailSentence')) || null,
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
    setDetailSentence(state, sentence) {
      state.detailSentence = sentence;
      localStorage.setItem('detailSentence', JSON.stringify(sentence));
    },
  },
  actions: {
    initAuthentication({ commit }) {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        commit('setAuthentication', true);
      } else {
        commit('setAuthentication', false);
      }
    },
    initAdmin({ commit }, status) {
      const isAdmin = status === 'true';
      
      commit('setAdmin', isAdmin);
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('detailSentence');

      commit('logout');
    },
    updateDetailSentence({ commit }, sentence) {
      commit('setDetailSentence', sentence);
    },
  },
});