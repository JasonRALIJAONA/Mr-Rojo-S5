import { createRouter, createWebHistory } from 'vue-router';

// Import des composants
import Login from './components/Login/LoginPage.vue';
import LoginAdmin from './components/Login/LoginAdminPage.vue';
import VenteForme from './components/Vente/VenteForm.vue';
import CardList from './components/Crypto/CardList.vue';
import listeCrypto from './components/Crypto/TableCrypto.vue';
import CryptoChart from './components/Crypto/CryptoChart.vue';
import EvolutionCrypto from './components/Crypto/EvolutionCrypto.vue';
import GestionFonds from './components/Fond/GestionFonds.vue';
import ValidationMvtFond from './components/Fond/ValidationMvtFond.vue';
import InscriptionPage from './components/Inscription/InscriptionPage.vue'
import historiqueTransaction from './components/Transaction/historiqueTransaction.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/LoginAdmin',
    name: 'LoginAdmin',
    component: LoginAdmin,
  },
  {
    path: '/InscriptionPage', // Déplacé en dehors de `/home`
    name: 'InscriptionPage',
    component: InscriptionPage,
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
        path: 'historiqueTransaction',
        name: 'historiqueTransaction',
        component: historiqueTransaction,
      },
      {
        path: 'CryptoChart',
        name: 'CryptoChart',
        component: CryptoChart,
      },
      {
        path: 'GestionFonds',
        name: 'GestionFonds',
        component: GestionFonds,
      },
      {
        path: 'ValidationMvtFond',
        name: 'ValidationMvtFond',
        component: ValidationMvtFond,
      },
      {
        path: 'EvolutionCrypto',
        name: 'EvolutionCrypto',
        component: EvolutionCrypto,
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