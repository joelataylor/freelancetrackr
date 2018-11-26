<template>
  <div>
    <Header title="Signup" />
    
    <section class="bg-white m-6 pt-6 px-6 pb-12">
      <h1 class="font-semibold">Let's get started</h1>
      <p>This must be your first time logging in to FreelanceTrackr. <br>
        To get started you need to enter your business name. <br>
        Simple as that!</p>
      <div>
        <input class="p-3 border rounded mt-8 mr-3 w-1/3" name="business_name" v-model="businessName" placeholder="Acme Inc">
        <button class="p-3 rounded bg-green text-white shadow hover:shadow-none hover:bg-green-dark" @click="createNewBusiness">Create my Business!</button>
        <div class="alert mt-3" v-if="error">
          <p>Oops &mdash; <em class="error-biz">{{businessName}}</em> {{error}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { firestore } from '@/firebase'
import Header from '@/components/Header'

export default {
  name: 'Signup',

  data: function() {
    return {
      businessName: null,
      error: null
    }
  },

  watch: {
    businessName: function(val) {
      if (val === null || val === '') {
        this.error = `You should probably enter a business name 😉`
        return
      }
      if (val.length <= 3) {
        this.error = `is not long enough - try something else ... or longer.`
        return
      }
      this.error = null
    }
  },

  computed: {
    trimmed_biz: function() {
      return this.businessName
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/([^a-zA-Z0-9._-]+)/, '')
    },
    user: function() {
      return this.$store.getters['user/user']
    },
    business: function() {
      return this.$store.getters['user/business']
    }
  },

  components: {
    Header
  },

  methods: {
    createNewBusiness() {
      let biz_name = this.trimmed_biz

      const ref = firestore.collection('accounts').doc(biz_name)
      ref.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          // Error due to Business name collision
          this.error = `already exists. Try another`
        } else {
          // Create new Business entry
          const business = {
            business_name: this.businessName,
            owner_id: this.user.uid
          }

          firestore
            .collection('accounts')
            .doc(biz_name)
            .set(business)
            .then(() => {
              this.$store.dispatch('user/setCurrentBusiness', business)
              this.$router.push('dashboard')
            })
            .catch(error => {
              this.error = error
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

<style scoped lang="scss">
.alert {
  @apply .text-red;
}
.error-biz {
  @apply .inline-block .bg-black .text-white mx-3 px-8;
}
</style>
