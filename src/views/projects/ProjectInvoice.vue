<template>
  <div>
    <Header title="Project Invoice"/>

    <section v-if="!loading" class="bg-white m-6 p-6">
      <div class="mb-6">
        <h3 class="font-semibold border-b mb-4">Project Details:</h3>
        <p class="flex">
          <label class="label">Project Name:</label>
          <router-link :to="{ name: 'projectEdit', params: { id: project['.key'] } }" class="text-blue hover:text-black">
            {{project.name}}
          </router-link>
        </p>
        <p class="flex"><label class="label">Client:</label> {{project.client.name}}</p>
        <p class="flex"><label class="label">Client Contact:</label> {{client.contact.first_name}} {{client.contact.last_name}}</p>
        <p class="flex"><label class="label">Total:</label> {{project.total | formatMoney}}</p>
      </div>

      <div class>
        <h3 class="font-semibold border-b mb-4">Details:</h3>
        <div class="mb-8">
          <text-input v-model="invoice.notes" size="full" type="box" class="mb-2">Notes</text-input>
          <date-input v-model="invoice.bill_date" class="mb-2">Bill Date</date-input>
          <date-input v-model="invoice.due_date" class="mb-2">Due Date</date-input>
          <date-input v-model="invoice.received_date" class="mb-2">Received Date</date-input>
        </div>

        <div class="mb-8">
          <div v-if="hasInvoice">
            <button class="mr-6 text-red hover:text-black" @click="deleteInvoice()">Delete</button>
            <button class="btn-blue btn-big mr-3" @click="saveInvoice()">Save Invoice</button>
          </div>
          <div v-else>
            <router-link :to="{ name: 'projects' }" class="mr-6 text-black hover:text-red">Cancel</router-link>
            <button class="btn-blue btn-big mr-3" @click="createInvoice()">Create Invoice</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { firestore } from '@/firebase'
import Header from '@/components/Header'
import TextInput from '@/components/TextInput'
import DateInput from '@/components/DateInput'

export default {
  name: 'ProjectInvoice',

  data: function() {
    return {
      loading: true,
      project: {},
      client: {},
      invoice: {
        notes: '',
        bill_date: new Date(),
        due_date: moment()
          .add(14, 'd')
          .toDate(),
        received_date: null
      }
    }
  },

  components: {
    Header,
    TextInput,
    DateInput
  },

  firestore() {
    return {
      project: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('projects')
          .doc(this.$route.params.id),
        resolve: () => {
          this.loadClient()
          if (this.project.invoice) {
            this.invoice = this.project.invoice
          }
        },
        reject: err => {
          console.log(err)
        }
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    business() {
      return this.$store.getters['user/business']
    },
    hasInvoice() {
      return !!this.project.invoice.bill_date
    }
  },

  methods: {
    createInvoice: function() {
      const invoice = this.invoice
      this.$firestore.project.update({ invoice: invoice }).then(() => {
        this.$toaster.success('An invoice has been created for this project!')
      })
    },
    loadClient() {
      const clientRef = firestore
        .collection('accounts')
        .doc(this.business.id)
        .collection('clients')
        .doc(this.project.client.id)
      this.$binding('client', clientRef).then(() => {
        this.loading = false
      })
    }
  }
}
</script>
