import { createRouter, createWebHistory } from 'vue-router';

// Import des composants
import Login from './components/Login/LoginPage.vue';
import ValiderPin from './components/Login/ValidationPin.vue';
import VenteForme from './components/Vente/VenteForm.vue';
import CardList from './components/Vente/CardList.vue';
import listeCrypto from './components/Crypto/TableCrypto.vue';
import CryptoChart from './components/Crypto/CryptoChart.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/validerPin',
    name: 'ValiderPin',
    component: ValiderPin,
  },
  {
    path: '/home',
    component: () => import('./components/MainLayout.vue'), // Layout principal avec navbar
    children: [
      {
        path: 'VenteForm',
        name: 'VenteForm',
        component: VenteForme,
      },
      {
        path: 'listeCrypto',
        name: 'ListeCrypto',
        component: listeCrypto,
      },
      {
        path: 'CryptoChart',
        name: 'CryptoChart',
        component: CryptoChart,
      },
      {
        path: 'ListeVente',
        name: 'CardList',
        component: CardList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
