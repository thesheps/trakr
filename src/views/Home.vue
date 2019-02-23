<template>
  <Tracker :startTime="startTime"/>
</template>

<script>
import Tracker from "../components/Tracker";

export default {
  components: {
    Tracker
  },

  props: ["startTime"]
};
</script>
