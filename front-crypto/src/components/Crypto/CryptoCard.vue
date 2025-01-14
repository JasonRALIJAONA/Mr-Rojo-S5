<template>
    <div class="crypto-card">
      <h2 class="card-nom">{{ nom }}</h2>
      <h3 class="card-symbole">{{ symbole }}</h3>
      <p class="card-prix">{{ prix }}</p>
      <p class="card-username">{{ username }}</p>

      <button class="card-button">{{ buttonText }}</button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    nom: {
      type: String,
      required: true,
    },
    prix: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .crypto-card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  .crypto-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .card-nom {
    font-size: 1.25rem;
    color: #0F2573;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  .card-prix {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0F2573;
    margin-bottom: 0.5rem;
  }
  
  .card-username {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .card-button {
    background-color: #0F2573;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s ease-in-out;
  }
  
  .card-button:hover {
    background-color: #093061;
  }
  </style>
  