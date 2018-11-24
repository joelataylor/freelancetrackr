<template>
  <div class="font-sans font-normal text-black leading-normal">
    <div class="flex">
      <div class="w-64 bg-black min-h-screen relative">
        <Nav />
      </div>

      <div class="w-full bg-grey-lighter" id="app">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'App',

  components: {
    Nav
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i');
</style>
