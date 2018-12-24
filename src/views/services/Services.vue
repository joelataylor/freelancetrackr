<template>
  <div>
    <Header title="Services"/>

    <section class="bg-white border-b border-grey px-8 py-2 flex items-center justify-between">
      <div class="subnav"></div>
      <router-link to="/services/new" class="btn-green inline-block">
        <span class="inline-block text-center mr-2">
          <font-awesome-icon size="xs" :icon="newIcon"/>
        </span> New Service
      </router-link>
    </section>

    <section class="bg-white m-6 p-6">
      <table v-if="!loading" class="w-full text-left table-collapse">
        <thead>
          <tr>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Name</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Details</th>
          </tr>
        </thead>
        <tbody class="align-baseline">
          <tr
            class="hover:bg-grey-lightest"
            v-for="service in services"
            :key="service['.key']"
            @click="$router.push('/services/'+service['.key'])"
          >
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <router-link class="link-dark" :to="'/services/'+service['.key']">{{service.name}}</router-link>
            </td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">${{service.price}} / {{service.per}}</td>
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
  name: 'Services',

  data: function() {
    return {
      newIcon: faPlus,
      loading: true,
      services: []
    }
  },

  computed: {
    user: function() {
      return this.$store.getters['user/user']
    },
    business: function() {
      return this.$store.getters['user/business']
    }
  },

  components: {
    Header,
    FontAwesomeIcon
  },

  firestore() {
    return {
      services: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('services'),
        resolve: data => {
          this.services = data
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
