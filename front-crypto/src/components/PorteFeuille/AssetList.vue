<template>
    <div class="asset-list">
      <h2>Vos actifs</h2>
      <div v-for="asset in assets" :key="asset.id" class="asset-item">
        <div class="asset-info">
          <span class="asset-name">{{ asset.name }}</span>
          <span class="asset-amount">{{ asset.amount }} {{ asset.symbol }}</span>
        </div>
        <span class="asset-value">${{ asset.value.toLocaleString() }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    assets: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .asset-list {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #0F2573;
    margin-bottom: 1rem;
  }
  
  .asset-item {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    padding: 0.75rem 0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .asset-item:last-child {
    border-bottom: none;
  }
  
  .asset-info {
    display: flex;
    flex-direction: column;
  }
  
  .asset-name {
    font-weight: bold;
    color: #0F2573;
  }
  
  .asset-amount {
    font-size: 0.9rem;
    color: #666;
  }
  
  .asset-value {
    font-weight: bold;
    color: #4CAF50;
  }
  </style>