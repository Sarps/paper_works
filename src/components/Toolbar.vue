<template>
  <v-toolbar
    dark
    color="primary"
    height="114px"
    class="toolbar"
    app
    clipped-left
  >
    <v-tabs v-model="value" color="primary" dark slider-color="grey">
      <v-tab-item v-for="(tab, index) in tabs" :key="index">
        <v-card light>
          <v-container fluid pa-0 ma-0>
            <v-layout row wrap align-center>
              <template v-for="(btn, i) in tab.content">
                <v-card
                  v-if="btn.type === 'card'"
                  class="tool-item"
                  flat
                  :key="i"
                  v-ripple
                  @click="tabbar_button(`${tab.name}.${btn.key}`)"
                >
                  <v-flex text-xs-center font-weight-medium>
                    <div>
                      <v-icon>{{ btn.icon }}</v-icon>
                    </div>
                    <div>{{ btn.text }}</div>
                  </v-flex>
                </v-card>
                <v-layout
                  column
                  wrap
                  class="list-group"
                  :key="i"
                  v-else-if="btn.type === 'group'"
                >
                  <v-btn
                    class="hr-btn"
                    v-for="(item, index) in btn.items"
                    :key="index"
                    flat
                    small
                    @click="tabbar_button(`${tab.name}.${btn.key}`)"
                  >
                    {{ item.text }}
                    <v-icon right dark>{{ item.icon }}</v-icon>
                  </v-btn>
                </v-layout>
                <v-divider
                  vertical
                  :key="i"
                  v-else-if="btn.type === 'divider'"
                ></v-divider>
              </template>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab ripple v-for="(tab, index) in tabs" :key="index">{{
        tab.name
      }}</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    tabs() {
      return this.$store.state.TABBAR;
    }
  },

  methods: {
    ...mapActions(["tabbar_button"])
  }
};
</script>

<style lang="scss">
.tool-item {
  width: 80px !important;
  max-width: 80px !important;
  height: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.list-group {
  flex: none;
  align-self: start;
}

.hr-btn {
  text-transform: capitalize !important;
  margin: 0 !important;

  .v-btn__content {
    justify-content: space-between !important;
  }
}
</style>
