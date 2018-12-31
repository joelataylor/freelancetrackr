<template>
  <div>
    <Header title="Create New Project"/>

    <section class="bg-white m-6 p-6">
      <div>
        <h1 class="font-semibold mb-6">Let's get your new project details</h1>

        <div class>
          <h3 class="font-semibold border-b mb-4">Details:</h3>
          <div class="mb-8">
            <select-input v-model="clientId" :options="clients" class="mb-2">Client</select-input>
            <text-input v-model="project.name" size="full" class="mb-2">Project Name</text-input>
            <date-input v-model="project.start_date" class="mb-2">Start Date</date-input>
          </div>

          <div class="mb-8">
            <router-link :to="{ name: 'projects' }" class="mr-6 text-black hover:text-red">Cancel</router-link>
            <button class="btn-blue btn-big mr-3" @click="createProject()">Create Project</button>
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
import DateInput from '@/components/DateInput'

export default {
  name: 'ProjectNew',

  data: function() {
    return {
      project: {
        name: '',
        client: {
          id: '',
          name: ''
        },
        start_date: new Date(),
        completed_date: null,
        active: true,
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        items: [],
        invoice: {},
        payments: []
      },
      clients: [],
      clientId: null
    }
  },

  components: {
    Header,
    TextInput,
    SelectInput,
    DateInput
  },

  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    business() {
      return this.$store.getters['user/business']
    }
  },

  watch: {
    clientId: function() {
      // Add Client name to the `client` object
      const client = this.clients.find(itm => {
        return itm['.key'] == this.clientId
      })
      this.project.client.id = this.clientId
      this.project.client.name = client.name
    }
  },

  mounted: function() {
    var clientsRef = firestore
      .collection('accounts')
      .doc(this.business.id)
      .collection('clients')
    this.$binding('clients', clientsRef.where('active', '==', true))
  },

  methods: {
    createProject: function() {
      firestore
        .collection('accounts')
        .doc(this.business.id)
        .collection('projects')
        .add(this.project)
        .then(project => {
          console.log(project)
          this.$toaster.success('Your new project has been created!')
          this.$router.push(`/projects/${project.id}/edit`)
        })
    }
  }
}
</script>
