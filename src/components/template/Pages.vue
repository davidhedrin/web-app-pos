<template>
    <div class="page-container">

        <div v-if="title != null" class="page-title">
            {{ title }}
        </div>

        <div class="page-body p-0">
            <slot />
        </div>

    </div>
</template>

<script>
export default {
    props: {
        title: {
            default: null
        }
    },
    mounted() {
    },
    data() {
        return {};
    }
}
</script>

<style scoped>
.page-title {
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    padding: 1em;
    color: rgb(69, 69, 69);
}

.page-body {
    background-color: var(--vt-color-step-950);
    border-radius: 1em;
    min-height: 100vh;
    /* box-shadow: 0 .5em 1em var(--vt-color-step-800); */
    padding: 2em;
}

.page-body * {
    font-size: 14px;
}
</style>