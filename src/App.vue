<template>
  <v-app :dark="dark">
    <v-switch value v-model="dark" label="Dark Mode"></v-switch>
    <Home :startTime="startTime"/>
    <v-footer
      class="headline"
    >Tracking since: {{ startTime | moment("dddd, MMMM Do YYYY [@] hh:ss") }}</v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Home from "./views/Home";

export default {
  name: "App",

  components: {
    Home
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
