<template>
  <v-navigation-drawer v-model="isOpened" absolute dark temporary>
    <v-list dense class="pt-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Menu</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon @click.stop="$emit('input', false)">
            <v-icon>fa-chevron-left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile @click v-for="item in items" :to="item.link" :key="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>{{item.title}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";

export default {
  props: ["value"],

  data: function() {
    return {
      isOpened: this.value,
      items: [{ title: "Sessions", icon: "fa-calendar-alt", link: "/" }]
    };
  },

  watch: {
    value() {
      this.isOpened = this.value;
    }
  }
};
</script>