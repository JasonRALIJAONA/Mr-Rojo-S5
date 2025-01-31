<template>
  <div id="app" class="max-w-5xl mx-auto p-8 text-center">
    <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-8">Gestion des Fonds</h1>
    
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <form @submit.prevent="submitMvtFond" class="flex flex-col items-center">
        <div class="mb-4 w-full max-w-xs">
          <label for="montant" class="block text-left text-gray-700 dark:text-gray-300 mb-2">Montant :</label>
          <input
            type="number"
            id="montant"
            v-model="montant"
            step="0.01"
            required
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div class="mb-6 w-full max-w-xs">
          <label class="block text-left text-gray-700 dark:text-gray-300 mb-2">Type de transaction :</label>
          <div class="flex justify-between">
            <label class="flex items-center">
              <input type="radio" v-model="typeTransaction" value="depot" class="mr-2" />
              <span class="text-gray-700 dark:text-gray-300">Dépôt</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="typeTransaction" value="retrait" class="mr-2" />
              <span class="text-gray-700 dark:text-gray-300">Retrait</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="w-full max-w-xs py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          Soumettre
        </button>
      </form>
    </div>

    <div v-if="message" class="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
      <p class="text-green-700 dark:text-green-300">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const montant = ref(0);
const typeTransaction = ref('depot');
const message = ref('');

const submitMvtFond = async () => {
  if (montant.value <= 0) {
    message.value = 'Veuillez entrer un montant valide.';
    return;
  }

  try {
    const params = {};
    if (typeTransaction.value === 'depot') {
      params.depot = montant.value;
    } else {
      params.retrait = montant.value;
    }

    const response = await axios.get('http://localhost:8080/api/MvtFond/insertMvt', { params });

    // Récupération du message depuis la réponse backend
    message.value = response.data.message || 'Opération effectuée avec succès.';
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    message.value = 'Erreur lors de l\'enregistrement du mouvement.';
  }

  montant.value = 0;
  typeTransaction.value = 'depot';
};
</script>

<style scoped>
/* Styles personnalisés */
</style>
