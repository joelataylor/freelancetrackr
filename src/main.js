import Vue from 'vue'
import './firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import auth from '@/auth'
import moment from 'moment'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import '@/styles/main.scss'

Vue.config.productionTip = false

Vue.use(Toaster, { timeout: 2500 })

Vue.filter('formatDate', (value, format) => {
  if (!value) return ''
  switch (format) {
    case 'short':
      format = 'DD MMM YYYY'
      break

    default:
      format = 'ddd, MMM Do YYYY'
  }
  if (value.seconds) {
    return moment.unix(value.seconds).format(format)
  }
  const newDate = moment(value)
  if (newDate) {
    return newDate.format('ddd, MMM Do YYYY')
  }
})

Vue.filter('formatMoney', amount => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  return formatter.format(amount)
})

Vue.filter('formatServicePer', name => {
  switch (name) {
    case 'Hour':
      return 'hr'

    case 'Item':
      return 'itm'

    default:
      return name
  }
})

new Vue({
  router,
  store,
  beforeCreate() {
    auth.init(this)
  },
  render: h => h(App)
}).$mount('#app')
