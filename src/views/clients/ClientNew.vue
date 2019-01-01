<template>
  <div>
    <Header title="Create New Client"/>

    <section class="bg-white m-6 p-6">
      <div>
        <h1 class="font-semibold mb-6 text-center">Let's get your new client details</h1>

        <div class>
          <h3 class="font-semibold border-b mb-4">Details:</h3>
          <div class="mb-8 text-center">
            <text-input v-model="client.name">Business Name</text-input>
            <text-input v-model="client.phone">Office Phone</text-input>
            <text-input v-model="client.website">Website</text-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Address:</h3>
          <div class="mb-8 text-center">
            <text-input v-model="client.address.street">Street</text-input>
            <text-input v-model="client.address.city">City</text-input>
            <text-input v-model="client.address.state">State</text-input>
            <text-input v-model="client.address.zip">Zip</text-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Contact:</h3>
          <div class="mb-8 text-center">
            <text-input v-model="client.contact.first_name">First Name</text-input>
            <text-input v-model="client.contact.last_name">Last Name</text-input>
            <text-input v-model="client.contact.email">Email</text-input>
            <text-input v-model="client.contact.mobile">Mobile</text-input>
          </div>

          <div class="mb-8 text-center">
            <router-link :to="{ name: 'clients' }" class="mr-6 text-black hover:text-red">Cancel</router-link>
            <button class="btn-blue mr-3" @click="createClient()">Create Client</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { firestore } from '@/firebase'
import Header from '@/components/Header'
import TextInput from '@/components/TextInput'

export default {
  name: 'ClientNew',

  data: function() {
    return {
      client: {
        name: '',
        website: '',
        phone: '',
        active: true,
        address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        },
        contact: {
          first_name: '',
          last_name: '',
          email: '',
          mobile: ''
        },
        billing_contacts: [
          {
            id: 1,
            name: '',
            email: ''
          },
          {
            id: 2,
            name: '',
            email: ''
          },
          {
            id: 3,
            name: '',
            email: ''
          }
        ]
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    business() {
      return this.$store.getters['user/business']
    }
  },

  components: {
    Header,
    TextInput
  },

  methods: {
    createClient: function() {
      firestore
        .collection('accounts')
        .doc(this.business.id)
        .collection('clients')
        .add(this.client)
        .then(() => {
          this.$toaster.success('A new client has been created!')
          this.$router.push('/clients')
        })
    }
  }
}
</script>
