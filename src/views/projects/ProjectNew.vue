<template>
  <div>
    <Header title="Create New Project"/>

    <section class="bg-white m-6 p-6">
      <div>
        <h1 class="font-semibold mb-6 text-center">Let's get your new project details</h1>

        <div class>
          <h3 class="font-semibold border-b mb-4">Details:</h3>
          <div class="mb-8 text-center">
            <text-input v-model="project.name">Project Name</text-input>
            <text-input v-model="project.client_id">Client</text-input>
            <text-input v-model="project.start_date">Start Date</text-input>
            <text-input v-model="project.completed_date">Completed Date</text-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Totals:</h3>
          <div class="mb-8 text-center">
            <text-input v-model="project.tax">Tax</text-input>
            <text-input v-model="project.discount">Discount</text-input>
            <p>Subtotal: ${{project.subtotal}}</p>
            <p>Total: ${{project.total}}</p>
          </div>

          <h3 class="font-semibold border-b mb-4">Items:</h3>
          <div class="mb-8 text-center">
            
          </div>

          <div class="mb-8 text-center">
            <router-link :to="{ name: 'projects' }" class="mr-6 text-black hover:text-red">Cancel</router-link>
            <button class="btn-blue mr-3" @click="createProject()">Create Project</button>
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

export default {
  name: 'ProjectNew',

  data: function() {
    return {
      project: {
        name: '',
        client_id: '',
        start_date: '',
        completed_date: '',
        active: true,
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        items: [],
        invoices: [],
        payments: []
      }
    }
  },

  components: {
    Header,
    TextInput
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
    createProject: function() {
      firestore
        .collection('accounts')
        .doc(this.business.id)
        .collection('projects')
        .add(this.project)
        .then(project => {
          this.$toaster.success('Your new project has been created!')
          this.$router.push(`/projects/${project['.key']}`)
        })
    }
  }
}
</script>
