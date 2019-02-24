import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "trakr",
  storage: localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],

  state: {
    startTime: null,
    currentTaskId: "",
    tasks: []
  },

  getters: {
    getStartTime: state => state.startTime,
    getCurrentTaskId: state => state.currentTaskId,
    getTasks: state => {
      let tasks = state.tasks;
      tasks.forEach(t => {
        t.times.forEach(time => {
          time.startTime = new Date(time.startTime);
          time.endTime = !time.endTime ? null : new Date(time.endTime);
        });
      });

      return tasks;
    }
  },

  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },

    updateTask(state, task) {
      let index = state.tasks.findIndex(x => x.id == task.id);
      state.tasks[index] = task;
    },

    setStartTime(state, startTime) {
      state.startTime = startTime;
    },

    setCurrentTaskId(state, taskId) {
      state.currentTaskId = taskId;
    }
  }
});
