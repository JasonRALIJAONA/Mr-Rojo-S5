import { createRouter, createWebHistory } from 'vue-router';

// Importez vos composants
import Login from './components/Login/LoginPage.vue';
import ValiderPin from './components/Login/ValidationPin.vue';
import VenteForme from './components/Vente/VenteForm.vue';
import CardList  from './components/Vente/CardList.vue';
import listeCrypto from './components/Crypto/TableCrypto.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/validerPin',
    name: 'validerPin',
    component: ValiderPin,
  },
  {
    path: '/VenteForm',
    name: 'VenteForm',
    component: VenteForme,
  },
  {
    path: '/listeCrypto',
    name: 'listeCrypto',
    component: listeCrypto,
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
