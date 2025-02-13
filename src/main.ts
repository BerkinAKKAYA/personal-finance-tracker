import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import './styles/style.css';
import './styles/reset.css';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, { theme: { preset: Aura } });
app.mount('#app');
