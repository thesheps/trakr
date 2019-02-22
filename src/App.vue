<template>
  <v-app :dark="dark">
    <v-switch value v-model="dark" label="Dark Mode"></v-switch>
    <Home/>
  </v-app>
</template>

<script>
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
  }
};
</script>
