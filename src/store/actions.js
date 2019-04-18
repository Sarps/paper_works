import screen from "../core";

export default {
  previewer_button(state, key) {
    alert("PREVIEWER." + key);
  },

  tabbar_button(state, key) {
    alert("TABBAR." + key);
  },

  init(state) {
    screen.init();
  }
};
