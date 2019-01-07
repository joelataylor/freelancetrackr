<template>
  <div>
    <Header title="Account Settings"/>
    
    <section class="bg-white m-6 p-6">
      <div>
        <h2 class="mb-2">Stripe Coupons/Discounts</h2>
        <ul>
          <li v-for="coupon in coupons" :key="coupon.id">
            {{coupon.name}}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { functions } from '@/firebase'
import Header from '@/components/Header'

export default {
  name: 'AccountEdit',

  data: function() {
    return {
      coupons: []
    }
  },

  components: {
    Header
  },

  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    business() {
      return this.$store.getters['user/business']
    }
  },

  methods: {},

  mounted: function() {
    const getCoupons = functions.httpsCallable('getStripeCoupons')
    getCoupons({
        businessId: this.business.id
      }).then(res => {
        console.log(res.data.data)
        this.coupons = res.data.data
      })
  }
}
</script>
