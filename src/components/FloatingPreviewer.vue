<template>
  <v-toolbar dense floating flat top color="transparent floating-toolbar" width="100%">
    <v-btn
      color="white"
      icon
      class="elevation-6"
      v-for="item in buttons"
      :key="item.key"
      @click="previewer_button(item.key)"
    >
      <v-icon>fa-1x {{ item.icon }}</v-icon>
    </v-btn>
    <v-btn icon class="white elevation-6" @click="toggleFullscreen">
      <v-icon>fa-1x far fa-compress</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>

import { mapActions } from "vuex";

export default {
  
  data() {
    return {};
  },

  methods: {

    ...mapActions(["previewer_button"]),

    toggleFullscreen(event) {
      var element = document.body;

      var isFullscreen =
        document.webkitIsFullScreen || document.mozFullScreen || false;

      element.requestFullScreen =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        function() {
          return false;
        };
      document.cancelFullScreen =
        document.cancelFullScreen ||
        document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        function() {
          return false;
        };

      isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
    }
  },

  computed: {
    buttons() {
      return this.$store.state.PREVIEWER;
    }
  }
};
</script>

<style>
.floating-toolbar {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15px;
  left: 0;
  right: 0;
}
</style>
