<script setup>
import { ref } from 'vue';
import CryptoCard from './../Crypto/CryptoCard.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const cards = ref([
  { id: 1, nom: 'Bitcoin', prix: '$45,000', username: 'satoshi_nakamoto' },
  { id: 2, nom: 'Ethereum', prix: '$3,200', username: 'vitalik_buterin' },
  { id: 3, nom: 'Cardano', prix: '$1.50', username: 'charles_hoskinson' },
  { id: 4, nom: 'Dogecoin', prix: '$0.25', username: 'elon_musk' },
  { id: 5, nom: 'Polkadot', prix: '$28', username: 'gavin_wood' },
]);
</script>

<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-bold text-blue-900 text-center mb-8">
      {{ title }}
    </h2>

    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

<style scoped></style>
