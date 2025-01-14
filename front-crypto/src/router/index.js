import { createRouter, createWebHistory } from 'vue-router';

// Importez vos composants
import Login from '../components/Login/LoginPage.vue';
import VenteForme from '../components/Vente/VenteForm.vue';
import CardList  from '../components/Vente/CardList.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/VenteForm',
    name: 'VenteForm',
    component: VenteForme,
  },
  {
    path: '/ListeVente',
    name: 'CardList',
    component: CardList,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
