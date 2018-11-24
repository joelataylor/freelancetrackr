<template>
  <div>
    <Header title="Signup" />
      
    <h1>Looks like you need to create a business</h1>
    <input name="business_name" v-model="new_business_name">
    <button @click="createNewBusiness">Create new business</button>
    <p class="alert">{{error}}</p>

  </div>
</template>

<script>
import { db } from '@/firebase'
import Header from '@/components/Header'

export default {
  name: 'Signup',

  data: function() {
    return {
      new_business_name: null,
      error: null
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
    Header
  },

  methods: {
    createNewBusiness() {
      let biz_name = this.new_business_name
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/([^a-zA-Z0-9._-]+)/, '')

      const ref = db.collection('accounts').doc(biz_name)
      ref.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          // Error due to Business name collision
          this.error = `Sorry, ${biz_name} already exists. Try another`
        } else {
          // Create new Business entry
          const business = {
            business_name: this.new_business_name,
            owner_id: this.user.uid
          }

          db.collection('accounts')
            .doc(biz_name)
            .set(business)
            .then(() => {
              this.$store.dispatch('user/setCurrentBusiness', business)
            })
            .catch(error => {
              console.log(
                'Oops, we had an error creating a new business: ',
                error
              )
            })
        }
      })
    }
  }
}
</script>

<style>
</style>
