<template>
    <textarea class="full" @change="$emit('update:modelValue', $event.target.value)" :rows="rows"
        :placeholder="placeholder">{{ modelValue }}</textarea>
</template>

<script>
export default {
    props: {
        rows: {
            type: Number,
            default: 3
        },
        placeholder: {
            default: ''
        },
        modelValue: {
            default: ''
        }
    }
}
</script>

<style scoped>
textarea {
    padding: 0.4em 1em;
    font-size: 1em;
    border: 1px solid #dee2e6;
    /* border: 1px solid var(--vt-color-step-900); */
    border-radius: var(--vt-border-radius-form);
    outline: none;
    background: white;
    font-size: 14px;
    color: var(--vt-color-step-300);
    vertical-align: middle;
    /* line-height: 2em; */
    /* min-width: 240px; */
}

textarea.full {
    width: 100%;
}
</style>