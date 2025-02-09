<script setup>
import { ref, onMounted, watch } from 'vue';
import CryptoCard from './../Crypto/CryptoCard.vue';
import axios from 'axios';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const cryptos = ref([]);
const selectedCryptoId = ref(null); // ID de la crypto-monnaie sélectionnée
const quantity = ref(1);
const totalPrice = ref(0);
const transactionType = ref('achat');

const fetchCryptos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cryptos/coursCryptoActuel');
    cryptos.value = response.data;
    calculateTotalPrice();
  } catch (error) {
    console.error("Erreur lors de la récupération des cryptos", error);
  }
};

const calculateTotalPrice = () => {
  const selectedCrypto = cryptos.value.find(c => c.id === selectedCryptoId.value);
  if (selectedCrypto) {
    totalPrice.value = selectedCrypto.prix_actuel * quantity.value;
  } else {
    totalPrice.value = 0;
  }
};

const submitTransaction = async () => {
  const selectedCrypto = cryptos.value.find(c => c.id === selectedCryptoId.value);
  if (!selectedCrypto) {
    alert("Veuillez sélectionner une crypto-monnaie.");
    return;
  }

  const payload = {
    cryptomonnaieId: selectedCrypto.id,
    prixUnitaire: selectedCrypto.prix_actuel,
    quantite: quantity.value,
    [transactionType.value]: totalPrice.value,
  };

  try {
    const response = await axios.post('http://localhost:8080/api/transactions/save', payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    alert(response.data.message);
  } catch (error) {
    console.error("Erreur lors de la transaction", error);
  }
};

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
              {{ crypto.nom_cryptomonnaie }} - {{ crypto.prix_actuel.toLocaleString() }} Ariary
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label>Quantité</label>
          <input v-model="quantity" type="number" min="1" @input="calculateTotalPrice" />
        </div>

        <div class="mb-4">
          <label>Prix Total</label>
          <input type="text" readonly :value="totalPrice.toLocaleString() + ' Ariary'" />
        </div>

        <div class="mt-6">
          <button type="submit" class="w-full bg-blue-600 text-white py-3">Confirmer</button>
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
