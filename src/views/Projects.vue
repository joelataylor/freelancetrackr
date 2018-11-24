<template>
  <div>
    <Header title="Projects" />

    <h1> This is the projects </h1>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Projects',

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
