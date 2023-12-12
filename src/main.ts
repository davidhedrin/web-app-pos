import { createApp } from 'vue';
import App from './App.vue';

// Select2
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// // Import CSS files
// import './assets/css/fonts.css';
// import './assets/vendor/css/simplebar.min.css';
// import './assets/css/theme.min.css';

// // Import JS files
// import './assets/js/config.js';
// import './assets/vendor/js/simplebar.min.js';
// import './assets/vendor/js/jquery.min.js';
// import './assets/vendor/js/popper.min.js';
// import './assets/vendor/js/bootstrap.min.js';
// import './assets/vendor/js/anchor.min.js';
// import './assets/vendor/js/is.min.js';
// import './assets/vendor/js/all.min.js';
// import './assets/vendor/js/lodash.min.js';
// import './assets/js/theme.js';

const app = createApp(App);
app.component("v-select", vSelect);
app.mount('#app');
