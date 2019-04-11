<template>
  <v-toolbar dark color="primary" height="100px" class="toolbar">
    <v-container fluid pa-0 ma-0>
      <v-layout row wrap align-center>
        <v-card flat v-for="i in 3" :key="i" class="tool-item align-center justify-center" color="transparent" @click="" href="#" v-ripple>
            <v-flex text-xs-center font-weight-medium>
                <div><v-icon>far fa-home</v-icon></div>
                <div>Extruded Boss / Base</div>
            </v-flex>
        </v-card>
        <v-layout column wrap class="list-group">
            <v-btn class="ma-0 hor-button" v-for="i in 3" :key="i" flat small>
                Swept Boss / Base
                <v-icon right dark>far fa-home</v-icon>
            </v-btn>
        </v-layout>
        <v-divider vertical :key="i"></v-divider>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tool-item {
  width: 80px !important;
  max-width: 80px !important;
  height: 84px;
}

.list-group {
    flex: none;
}

.hor-button {
    text-transform: capitalize !important;
}
</style>
