const functions = require('firebase-functions')
const moment = require('moment')

module.exports = {
  stripe: null,

  init: async function(businessId) {
    if (this.stripe === null) {
      const stripe_key = functions.config()[businessId].stripe_key
      this.stripe = require('stripe')(stripe_key)
    }
    return Promise.resolve('Done!')
  },

  createStripeCustomer: async function(client) {
    console.log('CREATING NEW STRIPE CUSTOMER')
    return this.stripe.customers
      .create({
        description: `${client.name}`,
        email: client.contact.email,
        metadata: { freelanceTrackrClientId: client.id },
        shipping: {
          address: {
            line1: client.address.street,
            city: client.address.city,
            country: client.address.country,
            postal_code: client.address.zip,
            state: client.address.state
          },
          name: client.name,
          phone: client.phone
        }
      })
      .then(customer => {
        console.log('WE HAVE CREATED A NEW STRIPE CUSTOMER: ', customer)
        return customer
      })
      .catch(err => {
        console.log('STRIPE CUSTOMER ERROR: ', err)
      })
  },

  getStripeCustomer: async function(client) {
    console.log('GETTING STRIPE CUSTOMER')
    return this.stripe.customers
      .retrieve(client.stripeCustomerId)
      .then(customer => {
        console.log('WE GOT A STRIPE CUSTOMER: ', customer)
        return customer
      })
  },

  createStripeInvoice: async function(project, client) {
    console.log('CREATING STRIPE INVOICE')
    let lineItems = []
    project.items.forEach(itm => {
      const liDate = moment.unix(itm.date.seconds).toDate()
      const itmDateFormatted = moment(liDate).format('MM/DD/YYYY')
      const itmPrice = itm.servicePrice * 100
      const itmPriceFormatted = `$${itm.servicePrice}`
      const li = this.stripe.invoiceItems.create({
        customer: client.stripeCustomerId,
        currency: 'usd',
        amount: itmPrice * itm.quantity,
        description: `${itmDateFormatted} - ${itm.serviceName} - ${itm.description} [${itm.quantity} x ${itmPriceFormatted}]`
      })
      lineItems.push(li)
    })
    await Promise.all(lineItems)

    console.log('NOW WE FINALIZE THE INVOICE')
    return this.stripe.invoices.create({
      customer: client.stripeCustomerId,
      auto_advance: true,
      billing: 'send_invoice',
      due_date: project.invoice.due_date.seconds,
      tax_percent: project.tax,
      description: invoice.notes
    })
  },

  resendStripeInvoice: async function(stripeInvoice, client) {
    console.log('RESENDING STRIPE INVOICE')
    return this.stripe.invoices.sendInvoice(stripeInvoice.id)
  },

  getStripeCoupons: async function() {
    console.log('GOING TO GET STRIPE COUPONS')
    return this.stripe.coupons.list()
  }
}
