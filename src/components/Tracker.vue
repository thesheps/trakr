<template>
  <v-container fill-height>
    <v-flex fill-height>
      <v-window class="elevation-1" v-model="index" height="100%">
        <v-window-item v-bind:key="item.id" v-for="item in items">
          <v-card>
            <v-card-text class="text-xs-center">
              <v-progress-circular size="500" width="50" :value="69"></v-progress-circular>
            </v-card-text>

            <v-container>
              <v-text-field v-model="item.taskName" label="Task Name" required></v-text-field>
              <v-btn block color="info" @click="start" :disabled="!item.taskName">Start Task</v-btn>
            </v-container>
          </v-card>
        </v-window-item>
      </v-window>

      <v-divider light></v-divider>

      <v-card-actions class="justify-space-between">
        <v-btn flat @click="previous" :disabled="index == 0">
          <v-icon>fa-chevron-left</v-icon>
        </v-btn>

        <v-btn color="success" block @click="create">Create New Task</v-btn>

        <v-btn flat @click="next" :disabled="items.length === 0 || index == items.length - 1">
          <v-icon>fa-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "trackr",
  props: {
    msg: String
  },
  data: () => ({
    index: 0,
    items: []
  }),
  mounted: function() {
    var vm = this;

    window.addEventListener("keyup", function(event) {
      if (event.keyCode == 37) {
        vm.previous();
      }

      if (event.keyCode == 39 && vm.index < vm.items.length) {
        vm.next();
      }
    });
  },
  methods: {
    create() {
      this.items.push({ id: this.items.length + 1 });
      this.index = this.items.length;
    },

    previous() {
      if (this.index > 0) {
        this.index -= 1;
      }
    },

    next() {
      if (this.index + 1 === this.items.length) {
        return;
      }

      this.index += 1;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
