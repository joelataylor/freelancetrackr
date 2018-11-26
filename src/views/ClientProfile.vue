<template>
  <div>
    <Header title="Client Profile" />

    <section class="bg-white m-6 p-6">
      <font-awesome-icon :icon="newIcon" />
      <div v-if="client">
        <h1>{{client.name}}</h1>
      </div>
    </section>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { firestore } from '@/firebase.js'

import Header from '@/components/Header'

export default {
  name: 'Client',

  data: function() {
    return {
      newIcon: faPlus,
      deleteIcon: faTrash,
      client: null
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
        },
        reject: err => {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply .border-blue .border-b-2 .text-black;
}
</style>
