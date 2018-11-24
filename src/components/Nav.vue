<template>
  <div class="">
    
    <nav class="py-5 border-t-1 border-transparent">
      <div class="logo flex items-center justify-center pb-5 text-white border-b border-grey-darkest">
        <font-awesome-icon :icon="logo" class="-ml-6 mr-1 text-blue" />
        <span class="font-semibold text-xl tracking-tight">FreelanceTrackr</span>
      </div>
      
      <div v-if="user && business">
        <router-link to="/dashboard" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="dashboardIcon" /></span> Dashboard
        </router-link>
        <router-link to="/projects" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="projectsIcon" /></span> Projects
        </router-link>
        <router-link to="/invoices" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="invoicesIcon" /></span> Invoices
        </router-link>
        <router-link to="/clients" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="clientsIcon" /></span> Clients
        </router-link>
        <router-link to="/services" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="servicesIcon" /></span> Services
        </router-link>
        <router-link to="/purchases" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="purchasesIcon" /></span> Purchases
        </router-link>
        <router-link to="/reports" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="reportsIcon" /></span> Reports
        </router-link>
      </div>
      <div v-else>
        <router-link to="/" class="block py-3 mt-8 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="homeIcon" /></span> Home
        </router-link>
        <router-link to="/about" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="aboutIcon" /></span> About
        </router-link>
        <router-link to="/signin" class="block py-3 text-sm text-grey hover:text-white">
          <span class="inline-block w-6 ml-4 mr-2 text-center"><font-awesome-icon :icon="loginIcon" /></span> Sign In
        </router-link>
      </div>
    </nav>
  
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faDollarSign,
  faHome,
  faStreetView,
  faGrinAlt,
  faCopy,
  faUserTie,
  faTable,
  faWallet,
  faChartLine,
  faNetworkWired,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Nav',

  data: function() {
    return {
      logo: faDollarSign,
      loginIcon: faStreetView,
      homeIcon: faHome,
      aboutIcon: faGrinAlt,
      dashboardIcon: faTable,
      projectsIcon: faNetworkWired,
      invoicesIcon: faCopy,
      clientsIcon: faUserTie,
      servicesIcon: faBoxOpen,
      purchasesIcon: faWallet,
      reportsIcon: faChartLine
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
    FontAwesomeIcon
  }
}
</script>

<style lang="scss">
.logo > .svg-inline--fa.fa-w-9 {
  width: 2rem;
  height: 2rem;
}
.router-link-exact-active {
  @apply .bg-blacker .border-blue .border-l-2;
}
</style>
