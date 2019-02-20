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
            </v-container>
          </v-card>
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-btn flat @click="previous" :disabled="index == 0">
          <v-icon>fa-chevron-left</v-icon>
        </v-btn>

        <v-btn flat @click="next" :disabled="index == items.length - 1">
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
    items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
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
