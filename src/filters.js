import Vue from 'vue'
import moment from 'moment'

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
