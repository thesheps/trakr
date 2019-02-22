import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTaskId: ""
  },

  getters: {
    getCurrentTaskId: state => state.currentTaskId
  },

  mutations: {
    setCurrentTaskId(state, taskId) {
      state.currentTaskId = taskId;
    }
  },

  actions: {
    setCurrentTaskId({ commit }, taskId) {
      commit("setCurrentTaskId", taskId);
    }
  }
});
