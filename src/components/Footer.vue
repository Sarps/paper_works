<template>
  <v-footer absolute inset>
    <v-toolbar dense color="primary darken-1" dark height="40px">
      <v-overflow-btn
        :items="dropdown_edit"
        editable
        label="Select size"
        hide-details
        class="pa-0"
        overflow
      ></v-overflow-btn>

      <v-divider vertical></v-divider>

      <v-spacer></v-spacer>

      <v-btn-toggle v-model="toggle_multiple" class="transparent" multiple>
        <v-btn :value="1" flat>
          <v-icon>fa-1x fas fa-bold</v-icon>
        </v-btn>

        <v-btn :value="2" flat>
          <v-icon>fa-1x fas fa-italic</v-icon>
        </v-btn>

        <v-btn :value="3" flat>
          <v-icon>fa-1x fas fa-underline</v-icon>
        </v-btn>

        <v-btn :value="4" flat>
          <v-icon>fa-1x fas fa-palette</v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-divider class="mx-2" vertical></v-divider>
      <v-spacer></v-spacer>

      <v-btn-toggle v-model="toggle_exclusive" class="transparent">
        <v-btn :value="1" flat>
          <v-icon>fa-1x fas fa-align-left</v-icon>
        </v-btn>

        <v-btn :value="2" flat>
          <v-icon>fa-1x fas fa-align-center</v-icon>
        </v-btn>

        <v-btn :value="3" flat>
          <v-icon>fa-1x fas fa-align-right</v-icon>
        </v-btn>

        <v-btn :value="4" flat>
          <v-icon>fa-1x fas fa-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
    </v-toolbar>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      dropdown_edit: [
        { text: "100%" },
        { text: "75%" },
        { text: "50%" },
        { text: "25%" },
        { text: "0%" }
      ],
      toggle_exclusive: 2,
      toggle_multiple: []
    };
  }
};
</script>

<style scoped>
.v-icon {
  color: white !important;
}

.v-btn {
  height: 30px;
}
</style>
