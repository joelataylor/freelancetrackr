<template>
  <div>
    <Header title="Create/Save Service"/>

    <section class="bg-white m-6 p-6">
      <div>
        <h1 class="font-semibold mb-6">Let's get your service details</h1>

        <div>
          <div v-if="isEditing" class="float-right">
            <button class="btn-red" @click="confirmDelete = true">
              <span class="inline-block text-center">
                <font-awesome-icon :icon="deleteIcon"/>
              </span>
            </button>
            <div v-if="confirmDelete" class="absolute pin-r w-128 mt-2">
              <p class="fdf">Are you sure you want to delete {{service.name}}?</p>
              <button class="btn mr-3 p-3" @click="confirmDelete = false">Oops, do not delete!</button>
              <button class="btn p-3" @click="deleteService()">Yep, delete them!</button>
            </div>
          </div>

          <h3 class="font-semibold border-b mb-4">Details:</h3>
          <div class="mb-8">
            <text-input v-model="service.name" class="mb-2">Service Name</text-input>
            <text-input v-model="service.price" size="small" placeholder="125.00" class="mb-2">Price ($)</text-input>
            <select-input v-model="service.per" :options="options" class="mb-2">Per</select-input>
          </div>

          <div class="mb-8 ml-32">
            <router-link :to="{ name: 'services' }" class="mr-6 text-black hover:text-red">Cancel</router-link>
            <button class="btn-big btn-blue mr-3" @click="saveService()">Save Service</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { firestore } from '@/firebase'
import Header from '@/components/Header'
import TextInput from '@/components/TextInput'
import SelectInput from '@/components/SelectInput'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Service',

  data: function() {
    return {
      service: {
        name: '',
        price: '',
        per: ''
      },
      options: ['Hour', 'Item'],
      isEditing: false,
      confirmDelete: false,
      deleteIcon: faTrashAlt
    }
  },

  components: {
    Header,
    TextInput,
    SelectInput,
    FontAwesomeIcon
  },

  mounted: function() {
    if (this.$route.params.id && this.$route.params.id !== 'new') {
      this.$binding(
        'service',
        this.serviceFirestorePath.doc(this.$route.params.id)
      )
        .then(() => {
          this.isEditing = true
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      this.service.per = this.options[0]
    }
  },

  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    business() {
      return this.$store.getters['user/business']
    },
    serviceFirestorePath() {
      return firestore
        .collection('accounts')
        .doc(this.business.id)
        .collection('services')
    }
  },

  methods: {
    saveService: function() {
      if (this.isEditing) {
        this.serviceFirestorePath
          .doc(this.service['.key'])
          .update({
            name: this.service.name,
            price: this.service.price,
            per: this.service.per
          })
          .then(() => {
            this.$toaster.success(`${this.service.name} has been updated!`)
            this.$router.push('/services')
          })
      } else {
        this.serviceFirestorePath.add(this.service).then(() => {
          this.$toaster.success('A new service has been created!')
          this.$router.push('/services')
        })
      }
    },

    deleteService: function() {
      this.serviceFirestorePath
        .doc(this.service['.key'])
        .delete()
        .then(() => {
          this.$toaster.success('The service has been deleted! Poof!')
          this.$router.push('/services')
        })
    }
  }
}
</script>
