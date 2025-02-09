<script setup>
import { ref, onMounted } from 'vue';
import CryptoCard from './../Crypto/CryptoCard.vue';
import axios from 'axios';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const cryptos = ref([]);
const selectedCrypto = ref(null); // Crypto-monnaie sélectionnée
const quantity = ref(1); // Quantité sélectionnée
const totalPrice = ref(0); // Prix total calculé
const transactionType = ref('achat'); // Type de transaction : 'achat' ou 'vente'

// Fonction pour récupérer les données depuis l'API
const fetchCryptos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cryptos/coursCryptoActuel');
    cryptos.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des cryptos", error);
  }
};

// Calculer le prix total en fonction de la crypto sélectionnée et de la quantité
const calculateTotalPrice = () => {
  if (selectedCrypto.value) {
    totalPrice.value = selectedCrypto.value.prix_actuel * quantity.value;
  }
};

// Rafraîchir les données toutes les 5 secondes
let interval;

onMounted(() => {
  fetchCryptos();
  interval = setInterval(fetchCryptos, 5000);
});

</script>

<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-bold text-blue-900 text-center mb-8">
      {{ title }}
    </h2>

    <!-- Affichage des cartes de crypto-monnaie -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <CryptoCard
        v-for="crypto in cryptos"
        :key="crypto.id"
        :nom="crypto.nom_cryptomonnaie"
        :prix="`${crypto.prix_actuel.toLocaleString()} Ariary`"
        :symbole="crypto.symbole_cryptomonnaie"
      />
    </div>

    <!-- Formulaire d'achat / vente -->
    <div class="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 class="text-2xl font-bold text-blue-900 mb-4">Acheter ou Vendre</h3>

      <form @submit.prevent="calculateTotalPrice">
        <!-- Type de transaction : Achat ou Vente -->
        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700 dark:text-gray-200">Type de Transaction</label>
          <div class="flex items-center gap-6 mt-2">
            <label class="inline-flex items-center text-lg text-gray-700 dark:text-gray-200">
              <input
                type="radio"
                value="achat"
                v-model="transactionType"
                class="form-radio"
              />
              <span class="ml-2">Achat</span>
            </label>
            <label class="inline-flex items-center text-lg text-gray-700 dark:text-gray-200">
              <input
                type="radio"
                value="vente"
                v-model="transactionType"
                class="form-radio"
              />
              <span class="ml-2">Vente</span>
            </label>
          </div>
        </div>

        <!-- Sélectionner une Crypto-monnaie -->
        <div class="mb-4">
          <label for="crypto" class="block text-lg font-medium text-gray-700 dark:text-gray-200">Choisir une Crypto-monnaie</label>
          <select
            v-model="selectedCrypto"
            id="crypto"
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option disabled value="">Sélectionnez une crypto</option>
            <option v-for="crypto in cryptos" :key="crypto.id" :value="crypto">
              {{ crypto.nom_cryptomonnaie }} - {{ crypto.prix_actuel.toLocaleString() }} Ariary
            </option>
          </select>
        </div>

        <!-- Quantité -->
        <div class="mb-4">
          <label for="quantity" class="block text-lg font-medium text-gray-700 dark:text-gray-200">Quantité</label>
          <input
            v-model="quantity"
            id="quantity"
            type="number"
            min="1"
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
            @input="calculateTotalPrice"
          />
        </div>

        <!-- Prix Total -->
        <div class="mb-4">
          <label for="totalPrice" class="block text-lg font-medium text-gray-700 dark:text-gray-200">Prix Total</label>
          <input
            id="totalPrice"
            type="text"
            readonly
            :value="totalPrice.toLocaleString() + ' Ariary'"
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <!-- Bouton Confirmer -->
        <div class="mt-6">
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Confirmer {{ transactionType === 'achat' ? 'l\'Achat' : 'la Vente' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour le formulaire */
form {
  max-width: 600px;
  margin: 0 auto;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3182ce;
}
</style>
