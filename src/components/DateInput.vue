<template>
  <p class="mr-2 flex items-center">
    <label v-if="$slots.default" class="label">
      <slot/>
    </label>
    <datepicker v-model="localDate" class="input-container" v-on:input="updateSelectedDate"></datepicker>
  </p>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'DateInput',
  props: ['value'],
  components: {
    Datepicker
  },
  methods: {
    updateSelectedDate: function() {
      console.log(this.value)
    }
  },
  computed: {
    localDate: {
      get() {
        if (_.isObject(this.value) && this.value.seconds) {
          return moment.unix(this.value.seconds).toDate()
        }
        if (!this.value) {
          return ''
        }
        const newDate = moment(this.value).toDate()
        return newDate
      },
      set(localDate) {
        this.$emit('input', localDate)
      }
    }
  }
}
</script>

<style lang="scss">
.input-container {
  @apply .w-1/3;
  display: inline-block;
}

.input-container div input {
  @apply .border .rounded .p-2;

  &:focus {
    @apply .border-blue;
  }
}
</style>
