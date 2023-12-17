<template>
  <div class="form-check form-switch">
    <input @change="$emit('update:modelValue', $event.target.checked)" class="form-check-input" type="checkbox" role="switch" :id="id" :checked="modelValue">
    <label class="form-check-label" :for="id">{{ label }}</label>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      label: String,
      modelValue: {
        type: Boolean,
        default: false,
      },
    }
  }
</script>

<style scoped>
label{
  font-size: 14px;
}
</style>