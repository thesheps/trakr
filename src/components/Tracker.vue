<template>
  <v-container fill-height>
    <v-flex fill-height>
      <v-window class="elevation-1" v-model="index" height="100%">
        <Task v-bind:task="task" v-bind:key="task.id" v-for="task in tasks"/>
      </v-window>

      <v-divider light></v-divider>

      <v-card-actions class="justify-space-between">
        <v-btn flat @click="previous" :disabled="index == 0">
          <v-icon>fa-chevron-left</v-icon>
        </v-btn>

        <v-btn outline large fab @click="create">
          <v-icon>fa-plus</v-icon>
        </v-btn>

        <v-btn flat @click="next" :disabled="tasks.length === 0 || index == tasks.length - 1">
          <v-icon>fa-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-flex>
  </v-container>
</template>

<script>
import Task from "./Task";

export default {
  name: "trackr",

  components: { Task },

  data: () => ({
    index: 0,
    tasks: []
  }),

  mounted: function() {
    var vm = this;

    window.addEventListener("keyup", function(event) {
      if (event.keyCode == 37) {
        vm.previous();
      }

      if (event.keyCode == 39 && vm.index < vm.tasks.length) {
        vm.next();
      }
    });
  },

  methods: {
    create() {
      this.tasks.push({ times: [] });
      this.index = this.tasks.length;
    },

    previous() {
      if (this.index > 0) {
        this.index -= 1;
      }
    },

    next() {
      if (this.index + 1 === this.tasks.length) {
        return;
      }

      this.index += 1;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
