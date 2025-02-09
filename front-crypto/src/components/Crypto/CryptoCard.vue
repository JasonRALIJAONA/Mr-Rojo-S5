<template>
  <div class="crypto-card bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 mb-6 transition-transform transform hover:-translate-y-1">
    <h2 class="card-nom text-xl font-semibold text-blue-700 dark:text-white mb-2">{{ nom }}</h2>
    <h3 class="card-symbole text-gray-600 dark:text-gray-300 mb-4">{{ symbole }}</h3>
    <p class="card-prix text-2xl font-bold text-blue-700 dark:text-white mb-4">{{ prix }}</p>
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
  symbole: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.crypto-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform transform;
}

.card-nom {
  @apply text-xl font-semibold text-blue-700 dark:text-white mb-2;
}

.card-symbole {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.card-prix {
  @apply text-2xl font-bold text-blue-700 dark:text-white mb-4;
}

.card-button {
  @apply bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors;
}
</style>
