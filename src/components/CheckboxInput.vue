<template>
  <div class="flex items-center mb-2">
    <label :for="name" class="label">
      <slot/>
    </label>
    {{prefix}}
      <input
        type="checkbox"
        :name="name"
        :id="name"
        :checked="value"
        @input="$emit('input', $event.target.checked)"
        class="input"
      />
    {{suffix}}
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: ['value', 'name', 'prefix', 'suffix']
}
</script>
