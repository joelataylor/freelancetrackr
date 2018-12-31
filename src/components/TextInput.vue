<template>
  <p :class="pStyles">
    <label v-if="$slots.default" class="label">
      <slot/>
    </label>
    {{prefix}}
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('submit')"
      :class="iStyles"
      :placeholder="placeholder"
    >
    {{suffix}}
  </p>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value', 'size', 'placeholder', 'prefix', 'suffix'],
  computed: {
    iStyles: function() {
      switch (this.size) {
        case 'tiny':
          return 'input w-16'

        case 'small':
          return 'input'

        case 'full':
          return 'input flex-1'

        default:
          return 'input'
      }
    },
    pStyles: function() {
      return this.$slots.default
        ? 'flex items-center'
        : 'flex items-center mr-2'
    }
  }
}
</script>
