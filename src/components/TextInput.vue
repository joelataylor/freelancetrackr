<template>
  <p class="mb-2">
    <label class="label">
      <slot/>
    </label>
    <input
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      v-bind:class="className"
      v-bind:placeholder="placeholder"
    >
  </p>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value', 'size', 'placeholder'],
  computed: {
    className: function() {
      return this.size == 'small' ? 'input input-small' : 'input'
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  @apply .w-1/3;
}

.input-small {
  @apply .w-32;
}
</style>
