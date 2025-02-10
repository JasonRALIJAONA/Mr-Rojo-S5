<script setup>
import { ref, onMounted } from 'vue';
import CryptoCard from './../Crypto/CryptoCard.vue';
import axios from 'axios';

// Props
defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Reactive properties
const cryptos = ref([]);
const selectedCryptoId = ref('');
const quantity = ref(1);
const transactionType = ref('achat');
const message = ref('');

// Fonction pour récupérer toutes les cryptos avec leur cours actuel
const fetchCryptos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cryptos/coursCryptoActuel');
    cryptos.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cryptos', error);
  }
};

// Fonction pour récupérer le prix actuel de la crypto sélectionnée
const getSelectedCryptoPrice = () => {
  if (!selectedCryptoId.value) return null;
  const cryptoData = cryptos.value.find(crypto => crypto.id === selectedCryptoId.value);
  return cryptoData ? cryptoData.prix_actuel : null;
};

// Fonction de soumission du formulaire
const submitTransaction = async () => {
  if (!selectedCryptoId.value) {
    alert('Veuillez sélectionner une crypto-monnaie.');
    return;
  }

  const prixUnitaire = getSelectedCryptoPrice();
  if (!prixUnitaire) {
    alert("Impossible de récupérer le cours actuel.");
    return;
  }

  if (quantity.value <= 0) {
    alert('La quantité doit être supérieure à 0.');
    return;
  }

  // Préparation du formulaire pour envoyer les paramètres sous forme de FormData
  const formData = new FormData();
  formData.append('cryptomonnaieId', selectedCryptoId.value);
  formData.append('prixUnitaire', prixUnitaire);
  formData.append('quantite', quantity.value);
  formData.append('typeTransaction', transactionType.value);

  try {
    const response = await axios.post('http://localhost:8080/api/transactions/save', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    message.value = response.data.message || 'Transaction effectuée avec succès.';
    alert(response.data.message);
  } catch (error) {
    console.error('Erreur lors de la transaction', error);
    const errorMessage = error.response?.data || 'Erreur lors de l\'enregistrement de la transaction.';
    message.value = errorMessage;
    alert(errorMessage);
  }
};

onMounted(() => {
  fetchCryptos();
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
    <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-8">Acheter ou Vendre</h1>
    <div class="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <form @submit.prevent="submitTransaction">
        <div class="mb-4">
          <label class="block text-lg font-medium">Type de Transaction</label>
          <div class="flex items-center gap-6 mt-2">
            <label>
              <input type="radio" value="achat" v-model="transactionType" /> Achat
            </label>
            <label>
              <input type="radio" value="vente" v-model="transactionType" /> Vente
            </label>
          </div>
        </div>

        <div class="mb-4">
          <label>Choisir une Crypto-monnaie</label>
          <select v-model="selectedCryptoId" class="w-full p-3 mt-2">
            <option disabled value="">Sélectionnez une crypto</option>
            <option v-for="crypto in cryptos" :key="crypto.id" :value="crypto.id">
              {{ crypto.nom_cryptomonnaie }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label>Quantité</label>
          <input v-model.number="quantity" type="number" min="1" class="w-full p-3 mt-2" />
        </div>

        <div class="mt-6">
          <button type="submit" class="w-full bg-blue-600 text-white py-3">Confirmer</button>
        </div>
      </form>
    </div>
    <div v-if="message" class="bg-green-100 dark:bg-green-900 p-4 rounded-lg mt-4">
      <p class="text-green-700 dark:text-green-300">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
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
