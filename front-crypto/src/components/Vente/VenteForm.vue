<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-xl mt-8">
    <h2 class="text-2xl font-semibold text-blue-900 text-center mb-6">
      Vendre des Cryptomonnaies
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="form-group">
        <label for="crypto" class="block text-sm font-medium text-gray-600 mb-2">
          Cryptomonnaie
        </label>
        <select
          id="crypto"
          v-model="selectedCrypto"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="" disabled>Choisissez une cryptomonnaie</option>
          <option
            v-for="crypto in cryptos"
            :key="crypto.id"
            :value="crypto.id"
          >
            {{ crypto.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="amount" class="block text-sm font-medium text-gray-600 mb-2">
          Quantité
        </label>
        <input
          id="amount"
          type="number"
          v-model="amount"
          min="0"
          step="0.01"
          placeholder="Entrez la quantité"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Vendre
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cryptos = ref([
  { id: 'btc', name: 'Bitcoin' },
  { id: 'eth', name: 'Ethereum' },
  { id: 'ada', name: 'Cardano' },
  { id: 'doge', name: 'Dogecoin' },
  { id: 'dot', name: 'Polkadot' },
]);

const selectedCrypto = ref('');
const amount = ref(0);

const handleSubmit = () => {
  if (selectedCrypto.value && amount.value > 0) {
    alert(`Vous avez vendu ${amount.value} unités de ${selectedCrypto.value}.`);
    selectedCrypto.value = '';
    amount.value = 0;
  } else {
    alert('Veuillez remplir tous les champs correctement.');
  }
};
</script>

<style scoped></style>
