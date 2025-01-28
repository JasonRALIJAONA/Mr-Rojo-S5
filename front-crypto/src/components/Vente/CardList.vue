        
<script setup>
import { ref } from 'vue';
import CryptoCard from './../Crypto/CryptoCard.vue';
defineProps({
    title:{
        type: String,
        required: true
    }
})
const cards = ref([
{ id: 1, nom: 'Bitcoin', prix: '$45,000', username: 'satoshi_nakamoto' },
{ id: 2, nom: 'Ethereum', prix: '$3,200', username: 'vitalik_buterin' },
{ id: 3, nom: 'Cardano', prix: '$1.50', username: 'charles_hoskinson' },
{ id: 4, nom: 'Dogecoin', prix: '$0.25', username: 'elon_musk' },
{ id: 5, nom: 'Polkadot', prix: '$28', username: 'gavin_wood' },
]);
</script>
<template>
  <div class="card-list">
    <h2 class="list-nom">{{title}}</h2>
    <div class="cards-container">
      <CryptoCard
        v-for="card in cards"
        :key="card.id"
        :nom="card.nom"
        :prix="card.prix"
        :username="card.username"
        :buttonText="'Acheter'"
      />
    </div>
  </div>
</template>
  
  <style scoped>
  .card-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .list-nom {
    font-size: 2rem;
    color: #0F2573;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .cards-container {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  </style>