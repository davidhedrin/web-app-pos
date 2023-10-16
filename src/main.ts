import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
// app.directive('number-only', {
//   beforeMount(el) {
//     el.addEventListener('input', (e) => {
//       const value = e.target.value;
//       const sanitizedValue = value.replace(/[^0-9]/g, '');
//       e.target.value = sanitizedValue;
//     });
//   },
// });
app.mount('#app');
