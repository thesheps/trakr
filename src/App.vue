<template>
  <v-app :dark="dark">
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="navOpened = !navOpened"></v-toolbar-side-icon>
      <v-toolbar-title>Trakr</v-toolbar-title>
    </v-toolbar>

    <Navigation v-model="navOpened"/>

    <router-view></router-view>

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
import Navigation from "./components/Navigation";

export default {
  name: "App",

  components: {
    Navigation
  },

  data() {
    return {
      dark: true,
      navOpened: false
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
