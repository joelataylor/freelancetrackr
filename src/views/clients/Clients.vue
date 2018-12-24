<template>
  <div>
    <Header title="Clients"/>

    <section class="bg-white border-b border-grey px-8 py-2 flex items-center justify-between">
      <div class="subnav">
        <a
          href
          @click.prevent="activeClients = true"
          :class="{ active: activeClients }"
          class="text-grey-darker pb-3 mr-6 hover:border-blue hover:border-b-2"
        >Active Clients</a>
        <a
          href
          @click.prevent="activeClients = false"
          :class="{ active: !activeClients }"
          class="text-grey-darker pb-3 hover:border-blue hover:border-b-2"
        >Nonactive Clients</a>
      </div>
      <router-link to="/clients/new" class="btn-green inline-block">
        <span class="inline-block text-center mr-2">
          <font-awesome-icon size="xs" :icon="newIcon"/>
        </span> New Client
      </router-link>
    </section>

    <section class="bg-white m-6 p-6">
      <table v-if="!loading" class="w-full text-left table-collapse">
        <thead>
          <tr>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Name</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Contact</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Website</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Total Value</th>
          </tr>
        </thead>
        <tbody class="align-baseline">
          <tr
            class="hover:bg-grey-lightest"
            v-for="client in viewingClients"
            :key="client['.key']"
            @click="$router.push('/clients/'+client['.key'])"
          >
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <router-link class="link-dark" :to="'/clients/'+client['.key']">{{client.name}}</router-link>
            </td>
            <td
              class="p-2 border-t border-grey-light text-xs whitespace-no-wrap"
            >{{client.contact.first_name}} {{client.contact.last_name}}</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">{{client.website}}</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">$2,340.00</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { firestore } from '@/firebase'

import Header from '@/components/Header'

export default {
  name: 'Clients',

  data: function() {
    return {
      newIcon: faPlus,
      loading: true,
      clients: [],
      activeClients: true
    }
  },

  computed: {
    user: function() {
      return this.$store.getters['user/user']
    },
    business: function() {
      return this.$store.getters['user/business']
    },
    viewingClients: function() {
      return this.clients.filter(client => {
        return client.active == this.activeClients
      })
    }
  },

  components: {
    Header,
    FontAwesomeIcon
  },

  firestore() {
    return {
      clients: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('clients'),
        resolve: data => {
          this.clients = data
          this.loading = false
        },
        reject: err => {
          console.log('WE ERR: ', err)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.active {
  @apply .border-blue .border-b-2 .text-black;
}
</style>
