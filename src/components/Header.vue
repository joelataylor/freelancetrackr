<template>
  <div class="flex justify-between items-center bg-white border-b border-grey-light px-8 py-4">
    <h2 class="font-normal text-lg">{{title}}</h2>

    <div v-if="user && business" class="flex items-center">
      <h3 class="mr-6">{{business.business_name}}</h3>
      <img :src="user.photoURL" class="rounded-full w-10 h-10">
      <button @click="logout" class="text-sm">
        Logout
      </button>
    </div>
    <div v-else class="h-10">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  props: ['title'],

  data: function() {
    return {}
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
  }
}
</script>
