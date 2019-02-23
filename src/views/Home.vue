<template>
  <Tracker :startTime="startTime"/>
</template>

<script>
import { mapGetters } from "vuex";
import Tracker from "../components/Tracker";

export default {
  components: {
    Tracker
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
