import { createApp } from 'vue';
import App from './App.vue';

// Select2
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const app = createApp(App);
app.component("v-select", vSelect);
app.mount('#app');
