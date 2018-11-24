import Vue from 'vue'
import './firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import auth from '@/auth'

import '@/styles/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    auth.init(this)
  },
  render: h => h(App)
}).$mount('#app')
