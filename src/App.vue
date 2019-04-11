<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  .toolbar .v-toolbar__content {
        padding-right: 0;
        padding-left: 0;
    }

  .v-icon.v-treeview-node__toggle {
    margin: 5px;
  }
</style>

