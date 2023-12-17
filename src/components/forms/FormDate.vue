<template>
    <VueDatePicker class="datepicker" format="yyyy-MM-dd" v-model="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
    </VueDatePicker>
</template>

<script>
export default {
    props: {},
    methods: {}
}
</script>

<style scoped>
.datepicker {
    border-radius: var(--vt-border-radius-form);
}
</style>