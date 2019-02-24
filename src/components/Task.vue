<template>
  <v-window-item>
    <v-card>
      <v-card-text class="text-xs-center">
        <v-progress-circular
          v-if="$vuetify.breakpoint.smAndUp"
          size="450"
          width="50"
          :value="ratio"
          rotate="-90"
        >
          <v-card-text class="display-3">{{timeElapsed | duration('humanize')}}</v-card-text>
        </v-progress-circular>

        <v-card-text v-else class="display-3">
          <p class="text-md-center">{{timeElapsed | duration('humanize')}}</p>
        </v-card-text>

        <v-text-field class="display-1" height="75" v-model="name" required></v-text-field>
        <v-btn large block :color="isRunning ? 'error' : 'success'" @click="toggle">{{ label }}</v-btn>
      </v-card-text>
    </v-card>
  </v-window-item>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "task",

  props: ["task", "startTime"],

  data: function() {
    return {
      isRunning: false,
      label: "Start",
      name: "",
      times: [],
      ratio: 0,
      timeElapsed: "00:00:00",
      timer: ""
    };
  },

  computed: {
    ...mapGetters({
      currentTaskId: "getCurrentTaskId"
    })
  },

  watch: {
    isRunning: function(newValue) {
      this.label = newValue ? "Pause" : "Start";
    },

    currentTaskId: function(newValue) {
      if (this.task.id !== newValue && this.times.length > 0) {
        this.times[this.times.length - 1].endTime = new Date();
        this.isRunning = false;

        this.$store.commit("updateTask", {
          name: this.name,
          id: this.task.id,
          times: this.times,
          isRunning: this.isRunning
        });
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  mounted() {
    this.isRunning = this.task.isRunning;
    this.label = this.isRunning ? "Pause" : "Start";
    this.name = this.task.name;
    this.times = this.task.times;
    this.timer = window.setInterval(this.recalculate, 1000);
  },

  methods: {
    recalculate() {
      let duration = 0;

      this.times.forEach(time => {
        let endTime = !time.endTime ? new Date() : time.endTime;
        duration += Math.abs(endTime - time.startTime);
      });

      this.ratio = (duration / (new Date() - new Date(this.startTime))) * 100;
      this.timeElapsed = duration;
    },

    toggle() {
      this.isRunning = !this.isRunning;

      if (this.isRunning) {
        this.times.push({ startTime: new Date() });
      } else {
        this.times[this.times.length - 1].endTime = new Date();
      }

      this.$store.commit("setCurrentTaskId", this.task.id);

      this.$store.commit("updateTask", {
        name: this.name,
        id: this.task.id,
        times: this.times,
        isRunning: this.isRunning
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>