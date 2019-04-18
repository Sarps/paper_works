<template>
  <v-navigation-drawer stateless value="true" dark class="primary darken-1" app clipped>
    <v-sheet class="pa-0 primary lighten-1">
      <v-text-field
        v-model="search"
        label="Search Tree"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="far fa-1x fa-times-circle"
      ></v-text-field>
    </v-sheet>
    <v-treeview
      v-model="tree"
      :items="items"
      activatable
      expand-icon="fas fa-1x fa-arrow-circle-down"
      hoverable
      item-key="name"
      :active="active"
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
          {{ open ? "fal fa-folder-open" : "fal fa-folder" }}
        </v-icon>
        <v-icon v-else>far fa-home</v-icon>
      </template>
      <template v-slot:append="{ active }">
        <v-btn icon color="primary" :disabled="!active" class="pa-0 ma-0">
          <v-icon>fas fa-1x fa-tint</v-icon>
        </v-btn>
        <v-btn icon color="primary" :disabled="!active" class="pa-0 ma-0">
          <v-icon>far fa-1x fa-eye</v-icon>
        </v-btn>
      </template>
    </v-treeview>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    tree: [],
    active: [],
    search: ""
  }),

  computed: {
    items() {
      return this.$store.state.MODELTREE;
    }
  },

  methods: {
    itemSelected() {

    }
  }
  
};
</script>
