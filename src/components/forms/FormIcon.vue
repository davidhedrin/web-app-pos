<template>
    <Icon>
        <component v-if="myicon != null" :is="myicon"></component>
    </Icon>
</template>

<script>
import { markRaw } from 'vue';
import * as fa from '@vicons/fa';
import * as ma from '@vicons/material';

export default {
    props: {
        icon: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "fa"
        }
    },
    data() {
        return {
            myicon: null
        };
    },
    mounted() {
        if (this.type == 'fa') this.myicon = markRaw(fa[this.icon]);
        else if (this.type == 'ma') this.myicon = markRaw(ma[this.icon]);
    }
}
</script>
