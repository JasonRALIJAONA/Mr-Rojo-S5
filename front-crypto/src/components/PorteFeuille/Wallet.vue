<template>
    <div class="wallet-container">
      <h1 class="wallet-title">Votre porte-feuille</h1>
      <WalletBalance :total-balance="totalBalance" />
      <WalletActions />
      <AssetList :assets="assets" />
      <TransactionHistory :transactions="transactions" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import WalletBalance from './WalletBalance.vue';
  import WalletActions from './WalletActions.vue';
  import AssetList from './AssetList.vue';
  import TransactionHistory from './TransactionHistory.vue';
  
  const assets = ref([
    { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 22500 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 4, value: 12800 },
    { id: 3, name: 'Cardano', symbol: 'ADA', amount: 1000, value: 1500 },
  ]);
  
  const transactions = ref([
    { id: 1, type: 'Achat', asset: 'BTC', amount: 0.1, value: 4500, date: '2023-05-01' },
    { id: 2, type: 'Vente', asset: 'ETH', amount: 2, value: 6400, date: '2023-04-28' },
    { id: 3, type: 'Transfert', asset: 'ADA', amount: 500, value: 750, date: '2023-04-25' },
  ]);
  
  const totalBalance = computed(() => {
    return assets.value.reduce((total, asset) => total + asset.value, 0);
  });
  </script>
  
  <style scoped>
  .wallet-container {
    width: 100%; /* Full width */
    max-width: 100%; /* Ensure no max-width constraints */
    margin: 0; /* Remove default margins */
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  
  .wallet-title {
    font-size: 2.5rem;
    color: #0F2573;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .wallet-container > * {
    margin-bottom: 1rem; /* Space between sections */
  }
  
  .wallet-container > *:last-child {
    margin-bottom: 0; /* No margin on the last element */
  }
  </style>
  