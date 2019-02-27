<template>
  <v-container fill-height>
    <v-flex fill-height>
      <v-card-title class="display-3">Sessions</v-card-title>

      <v-card v-if="sessions.length > 0">
        <v-list dense>
          <template v-for="session in sessions">
            <v-list-tile v-if="session" :key="session.id" :to="'session/' + session.id">
              <v-list-tile-content>
                <v-list-tile-title>{{session.startTime | moment("dddd, MMMM Do YYYY @ h:mm:ss a")}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>

      <div class="text-md-center">
        <v-btn outline large fab @click="create">
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import uuid from "uuid/v1";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      sessions: "getSessions"
    })
  },

  methods: {
    create() {
      this.$store.commit("addSession", {
        id: uuid(),
        startTime: new Date()
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
