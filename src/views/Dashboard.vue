<template>
  <div>
    <Header title="Dashboard" />

    <h1> This is the dashboard </h1>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Dashboard',

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

  components: {
    Header
  }
}
</script>

<style>
</style>
