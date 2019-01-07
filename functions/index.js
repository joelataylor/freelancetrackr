const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp()

const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

const stripeUtils = require('./stripeUtils')

// Listen for a Project update in the Firestore DB
exports.createAndSendInvoice = functions.firestore
  .document('accounts/{businessId}/projects/{projectId}')
  .onUpdate(async (change, context) => {
    console.log('WE GOT A PROJECT UPDATE EVENT')
    try {
      const businessId = context.params.businessId
      const project = change.after.data()
      const projectPrior = change.before.data()
      stripeUtils.init(businessId)

      console.log('PROJECT: ', project)

      // Prevent looping
      console.log('CHEKING FOR FIRST TIME INVOICE OR RESEND INVOICE FLAG')
      if (!projectPrior.invoice.bill_date || project.invoice.resend_invoice) {
        console.log(
          'EXITING NOT FIRST TIME INVOICE AND NOT RESENDING: ',
          projectPrior.invoice,
          project.invoice
        )
        return null
      }

      // Check Stripe is loaded
      if (!stripeUtils.stripe) {
        await stripeUtils.init()
      }

      // Get FreelanceTrackr Client object
      console.log('GET CLIENT FROM FIRESTORE')
      const client = await firestore
        .doc(`accounts/${businessId}/clients/${project.client.id}`)
        .get()
        .then(snap => {
          return snap.data()
        })
        .catch(error => {
          console.log('GETTING CLIENT ERROR: ', error)
        })
      console.log('GOT CLIENT: ', client)

      // Create new or get existing Stripe customer
      console.log('GET OR CREATE STRIPE INVOICE')
      let stripeInvoice
      if (!project.invoice.stripeInvoiceId) {
        console.log('CREATING STRIPE INVOICE', project, client)
        stripeInvoice = await stripeUtils.createStripeInvoice(project, client)

        // Save Stripe invoice id to the Project object in Firestore
        var newInvoice = project.invoice
        newInvoice.resend_invoice = false // always set this to false
        newInvoice.stripeInvoiceId = stripeInvoice.id // save new Stripe Invoice ID

        console.log(
          'SAVE STRIPE INVOICE ID TO CLIENT OBJECT IN FIRESTORE: ',
          stripeInvoice
        )
        return await change.after.ref
          .update(
            {
              invoice: newInvoice
            },
            {
              merge: true
            }
          )
          .then(() => {
            console.log('FINISHED UPDATING PROJECT.INVOICE OBJECT IN FIRESTORE')
            return true
          })
      } else if (project.invoice.resend_invoice) {
        console.log('GET STRIPE INVOICE TO RESEND')
        stripeInvoice = await stripeUtils.getStripeInvoice(
          project.invoice.stripeInvoiceId
        )
        console.log(
          'FINISHED GETTING EXISTING STRIPE INVOICE, NOW RESENDING',
          stripeInvoice
        )

        await stripeUtils.resendStripeInvoice(stripeInvoice, client)
        updatedInvoice = project.invoice
        updatedInvoice.resend_invoice = false // always set this to false
        return await change.after.ref
          .update(
            {
              invoice: updatedInvoice
            },
            {
              merge: true
            }
          )
          .then(() => {
            console.log('FINISHED RESENDING STRIPE INVOICE')
            return true
          })
      }
      return true
    } catch (error) {
      console.log('WE GOT AN ERROR SOMEWHERE: ', error)
      return false
    }
  })

// Listen for a Client update in the Firestore DB
exports.addClientToStripe = functions.firestore
  .document('accounts/{businessId}/clients/{clientId}')
  .onUpdate(async (change, context) => {
    console.log('WE GOT A CLIENT UPDATE EVENT')
    try {
      const businessId = context.params.businessId
      const clientId = context.params.clientId
      const client = change.after.data()
      client.id = clientId
      console.log('CLIENT: ', client)
      stripeUtils.init(businessId)

      // Prevent looping
      console.log('CHECKING FOR CLIENT STRIPE CUSTOMER ID')
      if (client.stripeCustomerId) {
        console.log(
          'EXITING DUE TO HAVING A STRIPE CUSTOMER ID: ',
          client.stripeCustomerId
        )
        return null
      }

      // Check Stripe is loaded
      if (!stripeUtils.stripe) {
        await stripeUtils.init()
        console.log('LOADING STRIPE AGAIN: ', stripeUtils.stripe)
      }

      // Create new or get existing Stripe customer
      console.log('CREATE STRIPE CUSTOMER')
      const customer = await stripeUtils.createStripeCustomer(client)
      console.log('STRIPE CUSTOMER: ', customer)

      // Save Stripe customer id to the Client object in Firestore
      console.log('SAVE STRIPE CUSTOMER ID TO CLIENT OBJECT IN FIRESTORE')
      return await change.after.ref
        .update(
          {
            stripeCustomerId: customer.id
          },
          {
            merge: true
          }
        )
        .then(() => {
          console.log('FINISHED UPDATING CLIENT OBJECT IN FIRESTORE')
          return true
        })
        .catch(err => {
          console.log('ERROR UPDATING DB CLIENT: ', err)
        })
    } catch (error) {
      console.log('WE GOT AN ERROR SOMEWHERE: ', error)
      return false
    }
  })

exports.getStripeCoupons = functions.https.onCall(async (data, context) => {
  console.log('WE GOT A CALL TO STRIPE COUPONS', data, context)
  await stripeUtils.init(data.businessId)
  return await stripeUtils.getStripeCoupons(data.businessId)
})
