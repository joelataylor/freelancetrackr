<template>
  <div>
    <Header title="Client Profile"/>

    <section class="bg-white m-6 p-6">
      <div v-if="!loadingClient">
        <div class="flex justify-between">
          <div>
            <button
              class="rounded inline-block px-3 py-2 text-sm text-white shadow-md hover:shadow-none hover:text-grey-lightest"
              :class="client.active ? 'bg-green-dark' : 'bg-red-dark'"
              @click="toggleActive()"
            >{{client.active ? 'Active' : 'Not Active'}}</button>
            <h1 class="font-semibold">{{client.name}}</h1>
          </div>
          <div class="text-right relative">
            <router-link
              :to="{ name: 'clientEdit', params: { id: $route.params.id } }"
              class="btn-blue mr-3"
            >
              <span class="inline-block text-center">
                <font-awesome-icon :icon="editIcon"/>
              </span>
            </router-link>
            <button class="btn-red" @click="confirmDelete = true">
              <span class="inline-block text-center">
                <font-awesome-icon :icon="deleteIcon"/>
              </span>
            </button>
            <div v-if="confirmDelete" class="absolute pin-r w-128 mt-2">
              <p class="fdf">Are you sure you want to delete {{client.name}}?</p>
              <button class="btn mr-3 p-3" @click="confirmDelete = false">Oops, do not delete!</button>
              <button class="btn p-3" @click="deleteClient()">Yep, delete them!</button>
            </div>
          </div>
        </div>

        <div class="flex py-6">
          <div class="mr-20">
            <h3 class="font-semibold">Details:</h3>
            <p>
              Office: {{client.phone | phone}}
              <br>
              <a v-bind:href="client.website" class="text-blue hover:text-red">{{client.website}}</a>
            </p>
          </div>

          <div class="mr-20">
            <h3 class="font-semibold">Address:</h3>
            <p>
              {{client.address.street}}
              <br>
              {{client.address.city}}, {{client.address.state}} {{client.address.zip}}
            </p>
          </div>

          <div class="mr-20">
            <h3 class="font-semibold">Contact:</h3>
            <p>
              {{client.contact.first_name}} {{client.contact.last_name}}
              <br>
              <a
                v-bind:href="'mailto:' + client.contact.email"
                class="text-blue hover:text-red"
              >{{client.contact.email}}</a>
              <br>
              {{client.contact.mobile | phone}}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white m-6 p-6">
      <h3 class="font-semibold">Invoices</h3>
    </section>

    <section class="bg-white m-6 p-6">
      <h3 class="font-semibold">Projects</h3>
    </section>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { firestore } from '@/firebase.js'
import Header from '@/components/Header'

export default {
  name: 'Client',

  data: function() {
    return {
      client: null,
      loadingClient: true,
      confirmDelete: false,
      editIcon: faPencilAlt,
      deleteIcon: faTrashAlt
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
    FontAwesomeIcon
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
          this.loadingClient = false
        },
        reject: err => {
          console.log(err)
        }
      }
    }
  },

  methods: {
    deleteClient: function() {
      this.$firestore.client.delete().then(() => {
        this.$toaster.success('The client has been deleted! Poof!')
        this.$router.push('/clients')
      })
    },
    toggleActive: function() {
      this.$firestore.client
        .update({
          active: !this.client.active
        })
        .then(() => {
          this.$toaster.success('The client has been saved!')
        })
    }
  },

  filters: {
    phone: function(phone) {
      return phone
        ? phone
            .replace(/[^0-9]/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        : ''
    }
  }
}
</script>
