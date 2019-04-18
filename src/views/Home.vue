<template>
  <v-container fill-height fluid class="pa-0">
    <FloatingPreviewer />
    <v-layout row wrap fill-height>
      <div class="flex red darken-3 xs12 fill-height"  tabindex="-1" id="screen"></div>
    </v-layout>
  </v-container>
</template>

<script>
import FloatingPreviewer from "../components/FloatingPreviewer";

export default {
  components: {
    FloatingPreviewer
  }
};
</script>
