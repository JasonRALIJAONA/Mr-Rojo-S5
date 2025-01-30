<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">{{ title }}</h2>

    <div v-if="cryptos.length" class="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-2xl">
      <table class="w-full min-w-full table-auto border-collapse text-left">
        <thead>
          <tr class="bg-blue-700 text-white">
            <th class="py-3 px-4 text-sm font-semibold">Nom</th>
            <th class="py-3 px-4 text-sm font-semibold">Symbole</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in cryptos" :key="crypto.id" class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="py-3 px-4 flex items-center gap-4 font-medium text-gray-700 dark:text-white">
              <span class="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full font-bold">
                {{ crypto.nom.charAt(0) }}
              </span>
              {{ crypto.nom }}
            </td>
            <td class="py-3 px-4 font-mono text-gray-600 dark:text-gray-300">{{ crypto.symbole }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-gray-600 dark:text-gray-400 mt-4">Aucune cryptomonnaie trouvée.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cryptos = ref([]);
const title = 'Liste des cryptomonnaies';

const fetchCryptos = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/cryptos');
    if (response.ok) {
      cryptos.value = await response.json();
    } else {
      console.error('Erreur lors du chargement des cryptomonnaies.');
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
};

onMounted(fetchCryptos);
</script>

<style scoped>
.container {
  max-width: 1200px;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
}
</style>
