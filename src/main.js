import Vue from 'vue'
import './firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import auth from '@/auth'
import './filters'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import '@/styles/main.scss'

Vue.config.productionTip = false

Vue.use(Toaster, { timeout: 2500 })

new Vue({
  router,
  store,
  beforeCreate() {
    auth.init(this)
  },
  render: h => h(App)
}).$mount('#app')
