<template>
  <div class="flex justify-between items-center bg-white border-b border-grey-light px-8 py-4">
    <h2 class="font-normal text-lg">{{title}}</h2>

    <div v-if="user && business" class="flex items-center">
      <h3 class="mr-6">{{business.business_name}}</h3>

      <div class="relative leading-none h-10">
        <div role="button" class="inline-block select-none" @click="open = !open">
          <span class="appearance-none flex items-center inline-block">
            <img :src="user.photoURL" class="rounded-full w-10 h-10 mr-1">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </div>
        <div class="absolute pin-r w-48 mt-3" v-show="open">
          <div class="bg-black shadow overflow-hidden">
            <a href="#" class="no-underline block py-3 text-sm text-grey border-b border-grey-darker hover:text-white hover:bg-blacker">
              <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="dashboardIcon" /></span> Profile
            </a>
            <a href="#" @click="logout" class="no-underline block py-3 text-sm text-grey border-b border-black hover:text-white hover:bg-blacker">
              <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="signOutIcon" /></span> Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-10"></div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserTie, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Header',

  props: ['title'],

  data: function() {
    return {
      open: false,
      dashboardIcon: faUserTie,
      signOutIcon: faSignOutAlt
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

  methods: {
    logout() {
      this.$store.dispatch('user/logUserOut')
    }
  },

  components: {
    FontAwesomeIcon
  }
}
</script>
