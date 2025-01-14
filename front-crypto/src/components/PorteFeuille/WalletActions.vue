<template>
    <div class="wallet-actions">
      <button @click="handleAction('buy')" class="action-button buy">Acheter</button>
      <button @click="handleAction('sell')" class="action-button sell">Vendre</button>
      <button @click="handleAction('transfer')" class="action-button transfer">Transferer</button>
    </div>
  </template>
  
  <script setup>
  const handleAction = (action) => {
    console.log(`${action} action triggered`);
    // Implement action logic here
  };
  </script>
  
  <style scoped>
  .wallet-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  
  .action-button {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .action-button:not(:last-child) {
    margin-right: 1rem;
  }
  
  .buy {
    background-color: #4CAF50;
    color: white;
  }
  
  .sell {
    background-color: #f44336;
    color: white;
  }
  
  .transfer {
    background-color: #2196F3;
    color: white;
  }
  
  .action-button:hover {
    opacity: 0.9;
  }
  </style>