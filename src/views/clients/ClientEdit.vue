<template>
  <div>
    <Header title="Client Edit"/>

    <section class="bg-white m-6 p-6">
      <div v-if="!loadingClient">
        <h1 class="font-semibold mb-6">Editing {{client.name}}</h1>

        <div class>
          <h3 class="font-semibold border-b mb-4">Details:</h3>
          <div class="mb-8">
            <text-input v-model="client.name" size="full" class="mb-2">Business Name</text-input>
            <text-input v-model="client.phone" class="mb-2">Office Phone</text-input>
            <text-input v-model="client.website" size="full" class="mb-2">Website</text-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Address:</h3>
          <div class="mb-8">
            <text-input v-model="client.address.street" size="full" class="mb-2">Street</text-input>
            <text-input v-model="client.address.city" size="full" class="mb-2">City</text-input>
            <text-input v-model="client.address.state" class="mb-2">State</text-input>
            <text-input v-model="client.address.zip" class="mb-2">Zip</text-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Contact:</h3>
          <div class="mb-8">
            <text-input v-model="client.contact.first_name" size="full" class="mb-2">First Name</text-input>
            <text-input v-model="client.contact.last_name" size="full" class="mb-2">Last Name</text-input>
            <text-input v-model="client.contact.email" size="full" class="mb-2">Email</text-input>
            <text-input v-model="client.contact.mobile" class="mb-2">Mobile</text-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Additional Billing Contacts:</h3>
          <div class="mb-8" v-for="contact in client.billing_contacts" :key="contact.id">
            <p class="ml-16 font-bold">Contact {{contact.id}}</p>
            <text-input v-model="contact.name" size="full" class="mb-2">Name</text-input>
            <text-input v-model="contact.email" size="full" class="mb-2">Email</text-input>
          </div>

          <div class="mb-8" v-if="dirty">
            <router-link
              :to="{ name: 'clientProfile', params: { id: $route.params.id } }"
              class="mr-6 text-black hover:text-red"
            >Cancel</router-link>
            <button class="btn-blue mr-3" @click="updateClient(client)">
              <span class="inline-block">
                <font-awesome-icon :icon="editIcon" class="mr-3"/>Save Client
              </span>
            </button>
          </div>
          <div class="mb-8" v-if="!dirty">
            <router-link
              :to="{ name: 'clientProfile', params: { id: $route.params.id } }"
              class="btn-blue"
            >Back to Client Profile</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { firestore } from '@/firebase'
import Header from '@/components/Header'
import TextInput from '@/components/TextInput'

export default {
  name: 'ClientEdit',

  data: function() {
    return {
      client: null,
      orgClient: null,
      loadingClient: true,
      dirty: false,
      editIcon: faPencilAlt
    }
  },

  watch: {
    client: {
      handler() {
        if (this.orgClient !== null) {
          this.dirty = !_.isEqual(this.client, this.orgClient)
        }
      },
      deep: true
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
    FontAwesomeIcon,
    TextInput
  },

  firestore() {
    return {
      client: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('clients')
          .doc(this.$route.params.id),
        resolve: data => {
          if (!data.billing_contacts) {
            this.client.billing_contacts = [
              { id: 1, name: '', email: '' },
              { id: 2, name: '', email: '' },
              { id: 3, name: '', email: '' }
            ]
            this.dirty = true
          }
          this.orgClient = _.cloneDeep(data)
          this.loadingClient = false
        },
        reject: err => {
          console.log(err)
        }
      }
    }
  },

  methods: {
    updateClient: function(client) {
      const uClient = _.cloneDeep(client)
      delete uClient['.key']

      this.$firestore.client.update(uClient).then(() => {
        this.$toaster.success('The client has been saved!')
        this.dirty = false
      })
    }
  },

  filters: {
    phone: function(phone) {
      return phone
        .replace(/[^0-9]/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
  }
}
</script>
