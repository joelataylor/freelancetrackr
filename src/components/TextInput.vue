<template>
  <p class="mb-2">
    <label class="label">
      <slot/>
    </label>
    <input
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      class="input"
    >
  </p>
</template>
<script>
export default {
  name: 'Header',
  props: ['value']
}
</script>
