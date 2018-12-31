<template>
  <div class="mr-2 flex items-center">
    <label v-if="$slots.default" class="label">
      <slot />
    </label>
    <span class="relative">
      <select class="select" v-model="selected" @change="updateValue">
        <optgroup v-if="options[0]['.key']">
          <option
            v-for="option in options"
            :key="option['.key']"
            :value="option['.key']"
            v-text="option.name"
          />
        </optgroup>
        <optgroup v-if="!options[0]['.key']">
          <option
            v-for="option in options"
            :key="option"
            :value="option"
            v-text="option"
          />
        </optgroup>
      </select>
      <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: ['options', 'value'],
  model: {
    event: 'change'
  },
  data() {
    return {
      selected: this.value
    }
  },
  watch: {
    value: function(val) {
      this.selected = val
    }
  },
  methods: {
    updateValue() {
      this.$emit('change', this.selected)
    }
  }
}
</script>
