<template>
  <div>
    <Header title="Projects"/>

    <section class="bg-white border-b border-grey px-8 py-2 flex items-center justify-between">
      <div class="subnav">
        <router-link to="/projects" class="text-grey-darker pb-3 mr-6">Current Projects</router-link>
        <router-link
          to="/projects/finished"
          class="text-grey-darker pb-3 hover:border-blue border-b-2"
        >Finished Projects</router-link>
      </div>
      <router-link to="/projects/new" class="btn-green inline-block">
        <span class="inline-block text-center mr-2">
          <font-awesome-icon size="xs" :icon="newIcon"/>
        </span> New Project
      </router-link>
    </section>

    <section class="bg-white m-6 p-6">
      <table v-if="!loading" class="w-full text-left table-collapse">
        <thead>
          <tr>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Client</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Project</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Start Date</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Amount</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Actions</th>
          </tr>
        </thead>
        <tbody class="align-baseline">
          <tr class="hover:bg-grey-lightest" v-for="project in projects" :key="project['.key']">
            <td
              class="p-2 border-t border-grey-light text-xs whitespace-no-wrap"
            >{{project.client.name}}</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">{{project.name}}</td>
            <td
              class="p-2 border-t border-grey-light text-xs whitespace-no-wrap"
            >{{project.start_date | formatDate}}</td>
            <td
              class="p-2 border-t border-grey-light text-xs whitespace-no-wrap"
            >{{project.total | formatMoney}}</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <router-link
                :to="{ name: 'projectInvoice', params: { id: project['.key'] } }"
                class="text-grey-dark hover:text-green mr-3"
              >
                <span class="inline-block mr-1 text-center">
                  <font-awesome-icon :icon="invoiceIcon"/>
                </span> Invoice
              </router-link>
              <router-link
                :to="{ name: 'projectEdit', params: { id: project['.key'] } }"
                class="text-grey-dark hover:text-blue mr-3"
              >
                <span class="inline-block mr-1 text-center">
                  <font-awesome-icon :icon="editIcon"/>
                </span> Edit
              </router-link>
              <a href @click="deleteProject(project)" class="text-grey-dark hover:text-red mr-3">
                <span class="inline-block mr-1 text-center">
                  <font-awesome-icon :icon="deleteIcon"/>
                </span> Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { firestore } from '@/firebase'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlus,
  faPencilAlt,
  faTrash,
  faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/Header'

export default {
  name: 'Projects',

  components: {
    Header,
    FontAwesomeIcon
  },

  data: function() {
    return {
      newIcon: faPlus,
      deleteIcon: faTrash,
      editIcon: faPencilAlt,
      invoiceIcon: faFileInvoiceDollar,
      loading: true,
      projects: []
    }
  },

  firestore() {
    return {
      projects: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('projects'),
        resolve: data => {
          this.projects = data
          this.loading = false
        },
        reject: err => {
          console.log('WE ERR: ', err)
        }
      }
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

  methods: {
    deleteProject: function(project) {
      console.log('DELETE PROJECT', project)
    }
  }
}
</script>
