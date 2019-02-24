<template>
  <v-container fill-height>
    <v-flex fill-height>
      <v-card-title class="display-3">Sessions</v-card-title>

      <v-card>
        <v-list dense>
          <template v-for="item in items">
            <v-list-tile :key="item.id" :to="'session?id=' + item.id">
              <v-list-tile-content>
                <v-list-tile-title>{{item.startTime | moment("dddd, MMMM Do YYYY @ h:mm:ss a")}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      headers: [
        { text: "Task", value: "task", sortable: true },
        { text: "Duration", value: "duration", sortable: true }
      ],

      items: [
        {
          id: "12345",
          startTime: new Date()
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
</style>
