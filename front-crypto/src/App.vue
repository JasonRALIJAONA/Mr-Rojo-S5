<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import LoginPage from './components/Login/LoginPage.vue';
import CardList from './components/Vente/CardList.vue';
import VenteForm from './components/Vente/VenteForm.vue';
import TableCrypto from './components/Crypto/TableCrypto.vue';
import ListePorteFeuille from './components/PorteFeuille/ListePorteFeuille.vue';
import Wallet from './components/PorteFeuille/Wallet.vue';
import './assets/tailwind.css';

const cryptoData = [
  { id: 1, nom: 'Bitcoin', cours: 45.000, quantite: 2 },
  { id: 2, nom: 'Ethereum', cours: 3.200, quantite:5 },
  { id: 3, nom: 'Cardano', cours: 1.50, quantite:5  },
  { id: 4, nom: 'Dogecoin', cours: 0.25, quantite:5  },
];

</script>

<template>
  <router-view></router-view>
</template>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} -->
<!-- </style> -->
