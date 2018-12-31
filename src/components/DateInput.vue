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
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'DateInput',
  props: {
    value: {
      type: [Date, String, Object],
      required: true
    }
  },
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
        if (this.value.seconds) {
          return moment.unix(this.value.seconds).toDate()
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
