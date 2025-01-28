<template>
    <div class="transaction-history">
      <h2>Transactions recentes</h2>
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
        <div class="transaction-info">
          <span class="transaction-type" :class="transaction.type.toLowerCase()">{{ transaction.type }}</span>
          <span class="transaction-asset">{{ transaction.amount }} {{ transaction.asset }}</span>
        </div>
        <div class="transaction-details">
          <span class="transaction-value">${{ transaction.value.toLocaleString() }}</span>
          <span class="transaction-date">{{ transaction.date }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    transactions: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .transaction-history {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #0F2573;
    margin-bottom: 1rem;
  }
  
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .transaction-item:last-child {
    border-bottom: none;
  }
  
  .transaction-info, .transaction-details {
    display: flex;
    flex-direction: column;
  }
  
  .transaction-type {
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .transaction-type.achat {
    background-color: #4CAF50;
    color: white;
  }
  
  .transaction-type.vente {
    background-color: #f44336;
    color: white;
  }
  
  .transaction-type.transfert {
    background-color: #2196F3;
    color: white;
  }
  
  .transaction-asset {
    font-size: 0.9rem;
    color: #666;
  }
  
  .transaction-value {
    font-weight: bold;
    color: #0F2573;
  }
  
  .transaction-date {
    font-size: 0.9rem;
    color: #666;
  }
  </style>