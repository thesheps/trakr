<template>
  <v-app :dark="dark">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Trakr</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <Tracker :startTime="startTime"/>

    <v-footer>
      <v-switch value v-model="dark" label="Dark Mode"></v-switch>
      <v-spacer/>
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
      dark: true
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
