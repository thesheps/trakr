<template>
  <v-app :dark="dark">
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Trakr</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute dark temporary>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>fa-chevron-right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon>fa-chevron-left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <Tracker :startTime="startTime"/>

    <v-footer>
      <v-switch value v-model="dark" label="Dark Mode"></v-switch>

      <div v-if="$vuetify.breakpoint.smAndUp">
        <strong>Tracking since:</strong>
        {{ startTime | moment("dddd, MMMM Do YYYY [@] hh:ss") }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Tracker from "./views/Tracker";

export default {
  name: "App",

  components: {
    Tracker
  },

  data() {
    return {
      dark: true,
      drawer: false
    };
  },

  computed: {
    ...mapGetters({
      startTime: "getStartTime"
    })
  },

  mounted() {
    if (!this.startTime) {
      this.$store.commit("setStartTime", new Date());
    }
  }
};
</script>
