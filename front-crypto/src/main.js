import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // Importez le routeur

// Créez une instance de l'application
const app = createApp(App);

// Utilisez le routeur
app.use(router);

// Montez l'application
app.mount('#app');
