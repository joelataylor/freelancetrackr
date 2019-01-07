<template>
  <div>
    <Header title="Edit Project"/>

    <section class="bg-white m-6 p-6">
      <div>
        <h1 class="font-semibold mb-6">Let's get your project updated</h1>

        <div v-if="!loading" class>
          <h3 class="font-semibold border-b mb-4">Details:</h3>
          <div class="mb-8">
            <select-input v-model="project.client.id" :options="clients" class="mb-2">Client</select-input>
            <text-input v-model="project.name" size="full" class="mb-2">Project Name</text-input>
            <date-input v-model="project.start_date" class="mb-2">Start Date</date-input>
          </div>

          <h3 class="font-semibold border-b mb-4">Items:</h3>
          <table class="mb-8 table-auto w-full">
            <thead>
              <tr class="text-left font-normal">
                <th>Date</th>
                <th>Service</th>
                <th class="w-3/5">Description</th>
                <th>Qty</th>
                <th>Price/{{lineItem.servicePer | formatServicePer}}</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-grey-light">
                <td class="pt-2 pb-3">
                  <date-input v-model="lineItem.date" size="small"></date-input>
                </td>
                <td class="pt-2 pb-3">
                  <select-input v-model="lineItemServiceId" :options="services" size="small"></select-input>
                </td>
                <td class="pt-2 pb-3">
                  <text-input v-model="lineItem.description" size="full"></text-input>
                </td>
                <td class="pt-2 pb-3">
                  <text-input v-model="lineItem.quantity" size="tiny" v-on:submit="addLineItem"></text-input>
                </td>
                <td class="pt-2 pb-3">
                  <text-input v-model="lineItem.servicePrice" size="tiny" prefix="$"></text-input>
                </td>
                <td class="pt-2 pb-3">
                  <p class="w-32">{{lineItemTotal | formatMoney}}</p>
                </td>
                <td class="pt-2 pb-3">
                  <button v-if="!isEditingLineItem" class="btn-blue" @click="addLineItem()">Add</button>
                  <button v-if="isEditingLineItem" class="btn-blue" @click="saveLineItem()">Save</button>
                  <a href v-if="isEditingLineItem" class="inline-block text-sm ml-2 text-black hover:text-red" @click.prevent="cancelEditLineItem()">Cancel</a>
                </td>
              </tr>
              <tr
                v-for="item in orderedLineItems"
                :key="item.id"
                :class="{ 'opacity-25': isEditingLineItem }"
              >
                <td class="py-2">{{item.date | formatDate('short')}}</td>
                <td class="py-2">{{item.serviceName}}</td>
                <td class="py-2">{{item.description}}</td>
                <td class="py-2">{{item.quantity}}</td>
                <td class="py-2">${{item.servicePrice}}/{{item.servicePer | formatServicePer}}</td>
                <td class="py-2">{{item.quantity * item.servicePrice | formatMoney}}</td>
                <td class="py-2 text-xs whitespace-no-wrap">
                  <button @click="editLineItem(item)" class="text-grey-dark hover:text-blue mr-3">
                    <span class="inline-block mr-1 text-center">
                      <font-awesome-icon :icon="editIcon"/>
                    </span> Edit
                  </button>
                  <button
                    @click="deleteLineItem(item.id)"
                    class="text-grey-dark hover:text-red mr-3"
                  >
                    <span class="inline-block mr-1 text-center">
                      <font-awesome-icon :icon="deleteIcon"/>
                    </span> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 class="font-semibold border-b mb-4">Totals:</h3>
          <div class="mb-8">
            <text-input v-model="project.tax" size="tiny" suffix="%" class="mb-2">Tax</text-input>
            <text-input v-model="project.discount" size="tiny" suffix="%" class="mb-2">Discount</text-input>
            <p class="flex mb-2">
              <label class="label">Subtotal</label>
              {{subtotal | formatMoney}}
            </p>
            <p class="flex mb-2">
              <label class="label">Total</label>
              {{total | formatMoney}}
            </p>
          </div>

          <div class="mb-8">
            <router-link :to="{ name: 'projects' }" class="mr-6 text-black hover:text-red">Cancel</router-link>
            <button class="btn-blue btn-big mr-3" @click="updateProject()">Update Project</button>
            <router-link :to="{ name: 'projectInvoice', params: { id: project['.key'] } }" class="btn-blue btn-big float-right">Invoice Project</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'
import cuid from 'cuid'
import { firestore } from '@/firebase'
import Header from '@/components/Header'
import TextInput from '@/components/TextInput'
import SelectInput from '@/components/SelectInput'
import DateInput from '@/components/DateInput'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'ProjectEdit',

  data() {
    return {
      loading: true,
      project: null,
      clients: [],
      services: [],
      lineItemServiceId: null,
      lineItem: {
        date: new Date(),
        serviceId: null,
        serviceName: null,
        servicePrice: 0,
        servicePer: null,
        description: null,
        quantity: 0
      },
      deleteIcon: faTrash,
      editIcon: faPencilAlt,
      isEditingLineItem: false
    }
  },

  components: {
    Header,
    TextInput,
    SelectInput,
    DateInput,
    FontAwesomeIcon
  },

  firestore() {
    return {
      project: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('projects')
          .doc(this.$route.params.id),
        resolve: () => {
          // this.project.items = _.sortBy(this.project.items, 'date')
        },
        reject: err => {
          console.log(err)
        }
      },
      clients: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('clients')
          .where('active', '==', true)
      },
      services: {
        ref: firestore
          .collection('accounts')
          .doc(this.business.id)
          .collection('services')
          .orderBy('name', 'desc'),
        resolve: data => {
          this.lineItemServiceId = data[0]['.key']
          this.loading = false
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
    },
    orderedLineItems() {
      return _.sortBy(this.project.items, 'date')
    },
    lineItemTotal() {
      return this.lineItem.servicePrice * this.lineItem.quantity
    },
    subtotal() {
      return _.sumBy(this.project.items, o => {
        return o.servicePrice * o.quantity
      })
    },
    total() {
      const discount = this.subtotal * (this.project.discount / 100)
      const tax = (this.subtotal - discount) * (this.project.tax / 100)

      return tax > 0
        ? (this.subtotal - discount) * tax
        : this.subtotal - discount
    },
    selectedClient() {
      const client = this.clients.filter(client => {
        return this.project.client.id == client['.key']
      })
      return client[0]
    }
  },

  watch: {
    lineItemServiceId: function() {
      this.setLineItemServiceDetails()
    },
    selectedClient: function() {
      if (this.project.client) {
        this.project.client.name = this.selectedClient.name
      }
    }
  },

  methods: {
    addLineItem: function() {
      const item = _.clone(this.lineItem)
      item.id = cuid()
      item.quantity = parseFloat(item.quantity)
      item.servicePrice = parseFloat(item.servicePrice)
      this.project.items.push(item)
      this.updateProject()
      this.resetLineItemInputs()
    },
    updateProject: function() {
      const uProject = _.clone(this.project)
      delete uProject['.key']
      uProject.updated_date = new Date()
      uProject.subtotal = this.subtotal
      uProject.total = this.total
      this.$firestore.project.update(uProject).then(() => {
        this.$toaster.success('Your new project has been updated!')
      })
    },
    deleteLineItem(itemId, updateProject = true) {
      this.$set(
        this.project,
        'items',
        this.project.items.filter(itm => {
          return itm.id !== itemId
        })
      )
      if (updateProject) {
        this.updateProject()
      }
    },
    editLineItem(item) {
      this.lineItem = item
      this.lineItemServiceId = item.serviceId
      this.isEditingLineItem = true
    },
    cancelEditLineItem() {
      this.isEditingLineItem = false
      this.resetLineItemInputs()
    },
    saveLineItem() {
      this.deleteLineItem(this.lineItem.id, false)
      this.lineItem.quantity = parseFloat(this.lineItem.quantity)
      this.lineItem.servicePrice = parseFloat(this.lineItem.servicePrice)
      this.project.items.push(this.lineItem)
      this.updateProject()
      this.isEditingLineItem = false
      this.resetLineItemInputs()
    },
    resetLineItemInputs() {
      this.lineItem = {
        date: new Date(),
        serviceId: null,
        serviceName: null,
        servicePrice: 0,
        servicePer: null,
        description: null,
        quantity: 0
      }
      this.setLineItemServiceDetails()
    },
    setLineItemServiceDetails() {
      const service = this.services.find(itm => {
        return itm['.key'] == this.lineItemServiceId
      })
      this.lineItem.serviceId = this.lineItemServiceId
      this.lineItem.serviceName = service.name
      this.lineItem.servicePer = service.per
      if (!this.isEditingLineItem) {
        this.lineItem.servicePrice = service.price
      }
    }
  }
}
</script>
