<template>
    <div class="wallet-balance">
      <h2>Total </h2>
      <p class="balance-amount">${{ formattedBalance }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    totalBalance: {
      type: Number,
      required: true
    }
  });
  
  const formattedBalance = computed(() => {
    return props.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  });
  </script>
  
  <style scoped>
  .wallet-balance {
    background-color: #0F2573;
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .balance-amount {
    font-size: 2.5rem;
    font-weight: bold;
  }
  </style>