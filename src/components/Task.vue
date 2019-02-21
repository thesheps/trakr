<template>
  <v-window-item>
    <v-card>
      <v-card-text class="text-xs-center">
        <v-progress-circular size="500" width="50" :value="ratio">
          <v-card-title class="display-4">{{timeElapsed}}</v-card-title>
        </v-progress-circular>
      </v-card-text>

      <v-container>
        <v-text-field v-model="name" label="Task Name" required></v-text-field>
        <v-btn
          large
          block
          :color="isRunning ? 'error' : 'success'"
          @click="toggle"
          :disabled="!name"
        >{{ label }}</v-btn>
      </v-container>
    </v-card>
  </v-window-item>
</template>

<script>
function msToTime(duration) {
  var seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export default {
  name: "task",

  props: ["task"],

  data: () => ({
    isRunning: false,
    label: "Start",
    name: "",
    times: [],
    ratio: 0,
    timeElapsed: "00:00:00",
    timer: ""
  }),

  watch: {
    isRunning: function(newValue) {
      this.label = newValue ? "Pause" : "Start";
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  mounted() {
    this.isRunning = this.task.isRunning;
    this.label = this.task.label;
    this.name = this.task.name;
    this.times = this.task.times;
    this.startTime = this.task.startTime;
    this.timer = window.setInterval(this.recalculate, 10);
  },

  methods: {
    recalculate() {
      let duration = 0;

      this.times.forEach(time => {
        let endTime = !time.endTime ? new Date() : time.endTime;
        duration += Math.abs(endTime - time.startTime);
      });

      this.ratio = duration / (new Date() - this.startTime);
      this.timeElapsed = msToTime(duration);
    },

    toggle() {
      this.isRunning = !this.isRunning;

      if (this.isRunning) {
        let date = new Date();
        this.times.push({ startTime: date });
      } else {
        this.times[this.times.length - 1].endTime = new Date();
      }

      this.recalculate();
    }
  }
};
</script>

<style scoped lang="scss">
</style>