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
    tasks: [],
    sessions: []
  },

  getters: {
    getStartTime: state => state.startTime,

    getCurrentTaskId: state => state.currentTaskId,

    getSessions: state => {
      return state.sessions;
    },

    getSessionById: (state, getters) => id => {
      return state.sessions.find(s => s.id === id);
    },

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

    addSession(state, session) {
      state.sessions.push(session);
    },

    setStartTime(state, startTime) {
      state.startTime = startTime;
    },

    setCurrentTaskId(state, taskId) {
      state.currentTaskId = taskId;
    }
  }
});
