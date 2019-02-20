<template>
  <v-window-item>
    <v-card>
      <v-card-text class="text-xs-center">
        <v-progress-circular size="500" width="50" :value="duration"></v-progress-circular>
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
export default {
  name: "task",

  props: ["task"],

  data: () => ({
    isRunning: false,
    label: "Start",
    name: "",
    times: [],
    duration: 0,
    timer: ""
  }),

  watch: {
    isRunning: function(newValue) {
      this.label = newValue ? "Pause" : "Start";
    }
  },

  created() {
    this.timer = setInterval(this.recalculate, 1000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  mounted() {
    this.isRunning = this.task.isRunning;
    this.label = this.task.label;
    this.name = this.task.name;
    this.times = this.task.times;
  },

  methods: {
    recalculate() {
      let duration = 0;
      this.times.forEach(time => {
        duration += Math.abs(time.endTime - time.startTime);
      });

      this.duration = 100 * (duration / 86400);
    },

    toggle() {
      this.isRunning = !this.isRunning;

      if (this.isRunning) {
        this.times.push({ startTime: new Date() });
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