import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "trackr",
  storage: localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],

  state: {
    currentTaskId: "",
    tasks: []
  },

  getters: {
    getCurrentTaskId: state => state.currentTaskId,
    getTasks: state => state.tasks
  },

  mutations: {
    setCurrentTaskId(state, taskId) {
      state.currentTaskId = taskId;
    },

    addTask(state, task) {
      state.tasks.push(task);
    },

    updateTask(state, task) {
      let index = state.tasks.findIndex(x => x.id == task.id);
      state.tasks[index] = task;
    }
  },

  actions: {
    setCurrentTaskId({ commit }, taskId) {
      commit("setCurrentTaskId", taskId);
    },

    addTask({ commit }, task) {
      commit("addTask", task);
    },

    updateTask({ commit }, task) {
      commit("updateTask", task);
    }
  }
});
