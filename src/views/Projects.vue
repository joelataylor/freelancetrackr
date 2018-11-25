<template>
  <div>
    <Header title="Projects" />

    <section class="bg-white border-b border-grey px-8 py-2 flex items-center justify-between">
      <div class="subnav">
        <router-link to="/projects" class="text-grey-darker pb-3 mr-6">Current Projects</router-link>
        <router-link to="/projects/finished" class="text-grey-darker pb-3 hover:border-blue border-b-2">Finished Projects</router-link>
      </div>
      <button class="py-2 pr-4 bg-green-dark text-white rounded shadow font-semibold text-sm hover:shadow-none hover:bg-green-darker">
        <span class="inline-block ml-3 mr-1 text-center"><font-awesome-icon size="xs" :icon="newIcon" /></span> New Project
      </button>
    </section>

    <section class="bg-white m-6 p-6">
      <table class="w-full text-left table-collapse">
        <thead>
          <tr>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Client</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Project</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Start Date</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Amount</th>
            <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest"></th>
          </tr>
        </thead>
        <tbody class="align-baseline">
          <tr class="hover:bg-grey-light">
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Symposia Labs</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Misc tasks for November 2019</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Nov 1st, 2018</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">$2,340.00</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <a href="" class="text-grey-dark hover:text-red"><span class="inline-block ml-3 mr-1 text-center">
                <font-awesome-icon size="" :icon="deleteIcon" /> 
              </span> Delete</a>
            </td>
          </tr>
          <tr class="hover:bg-grey-light">
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Symposia Labs</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Misc tasks for November 2019</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Nov 1st, 2018</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">$2,340.00</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <a href="" class="text-grey-dark hover:text-red"><span class="inline-block ml-3 mr-1 text-center">
                <font-awesome-icon size="" :icon="deleteIcon" /> 
              </span> Delete</a>
            </td>
          </tr>
          <tr class="hover:bg-grey-light">
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Symposia Labs</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Misc tasks for November 2019</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Nov 1st, 2018</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">$2,340.00</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <a href="" class="text-grey-dark hover:text-red"><span class="inline-block ml-3 mr-1 text-center">
                <font-awesome-icon size="" :icon="deleteIcon" /> 
              </span> Delete</a>
            </td>
          </tr>
          <tr class="hover:bg-grey-light">
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Symposia Labs</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Misc tasks for November 2019</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">Nov 1st, 2018</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">$2,340.00</td>
            <td class="p-2 border-t border-grey-light text-xs whitespace-no-wrap">
              <a href="" class="text-grey-dark hover:text-red"><span class="inline-block ml-3 mr-1 text-center">
                <font-awesome-icon size="" :icon="deleteIcon" /> 
              </span> Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/Header'

export default {
  name: 'Projects',

  data: function() {
    return {
      newIcon: faPlus,
      deleteIcon: faTrash
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
    Header,
    FontAwesomeIcon
  }
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply .border-blue .border-b-2 .text-black;
}
</style>
