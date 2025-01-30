import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import router from './router'; // Importez le routeur

createApp(App)
  .use(router) // Utilisation du routeur
  .mount('#app');
