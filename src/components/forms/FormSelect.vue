<template>
    <select @change="$emit('update:modelValue', $event.target.value)">
        <option value="">{{ textFirst ? textFirst : 'Pilih' }}</option>
        <option v-for="(v, k) in option" :key="k" :value="v.value" :selected="v.value == curr">{{ v.text }}</option>
    </select>
</template>

<script>
export default {
    props: {
        option: {
            default() {
                return [];
            }
        },
        modelValue: {
            default: ''
        },
        textFirst: String,
    },
    data() {
        return {
            curr: ''
        };
    },
    mounted() {
        // console.log(this.option,this.modelValue);
        this.curr = this.modelValue;
    },
    watch: {
        // modelValue: function (n, o) {
        //     this.curr = n;
        //     // console.log(n, o)
        // }
    }

}
</script>

<style scoped>
select {
    padding: 0.4em 1em;
    font-size: 1em;
    border: 1px solid #dee2e6;
    /* border: 1px solid var(--vt-color-step-900); */
    border-radius: var(--vt-border-radius-form);
    outline: none;
    height: var(--vt-height-form);
    background: white;
    font-size: 14px;
    color: var(--vt-color-step-300);
    vertical-align: middle;
    line-height: 2em;
    width: 100%;
    /* min-width: 240px; */
}
</style>