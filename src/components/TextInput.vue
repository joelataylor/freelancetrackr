<template>
  <div :class="pStyles">
    <label v-if="$slots.default" class="label">
      <slot/>
    </label>
    <p v-if="prefix">{{prefix}}</p>
    <div v-if="(type == 'box')" class="flex-1">
      <textarea
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="$emit('submit')"
        :class="iStyles"
        class="textarea"
        :placeholder="placeholder"
      />
    </div>
    <div v-else class="flex-1">
      <input
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="$emit('submit')"
        :class="iStyles"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="suffix" class="text-sm">{{suffix}}</p>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value', 'size', 'type', 'placeholder', 'prefix', 'suffix'],
  computed: {
    iStyles: function() {
      switch (this.size) {
        case 'tiny':
          return 'input w-16'

        case 'small':
          return 'input'

        case 'full':
          return 'input w-full'

        default:
          return 'input'
      }
    },
    pStyles: function() {
      return this.$slots.default
        ? 'flex flex-wrap items-center'
        : 'flex flex-wrap items-center mr-2'
    }
  }
}
</script>
