<template>
  <div>
    <Header title="Client Edit"/>

    <section class="bg-white m-6 p-6">
      <div v-if="!loadingClient">
        <h1 class="font-semibold mb-6 text-center">Editing {{client.name}}</h1>

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

          <div class="mb-8 text-center" v-if="dirty">
            <router-link
              :to="{ name: 'clientProfile', params: { id: $route.params.id } }"
              class="mr-6 text-black hover:text-red"
            >Cancel</router-link>
            <button class="btn-blue mr-3" @click="updateClient(client)">
              <span class="inline-block text-center">
                <font-awesome-icon :icon="editIcon" class="mr-3"/>Save Client
              </span>
            </button>
          </div>
          <div class="mb-8 text-center" v-if="!dirty">
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
      handler: function() {
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
          this.client = data
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
      const uClient = { address: {}, contact: {} }
      uClient.name = client.name
      uClient.active = client.active
      uClient.phone = client.phone
      uClient.website = client.website
      uClient.address.street = client.address.street
      uClient.address.city = client.address.city
      uClient.address.state = client.address.state
      uClient.address.zip = client.address.zip
      uClient.contact.first_name = client.contact.first_name
      uClient.contact.last_name = client.contact.last_name
      uClient.contact.email = client.contact.email
      uClient.contact.mobile = client.contact.mobile

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
