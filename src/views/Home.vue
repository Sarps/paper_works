<template>
  <div class="fill-height">
    <v-tabs v-model="value" color="primary" dark slider-color="white">
      <v-tab-item v-for="n in 3" :key="n">
        <Toolbar/>
      </v-tab-item>
      <v-tab ripple v-for="n in 3" :key="n">tabText</v-tab>
    </v-tabs>
    <ModelTree />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import Toolbar from "../components/Toolbar";
import ModelTree from "../components/ModelTree";

export default {
  components: {
    HelloWorld,
    Toolbar,
    ModelTree
  }
};
</script>
