import Vue from 'vue'
import Vuetify, {
  VApp,
  VToolbar,
  VSpacer
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  components: {
    VApp, VToolbar, VSpacer
  },
  iconfont: 'fa',
})
