<template>
  <div class="container mx-auto py-8">
    <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-8">Historique des Transactions</h2>

    <!-- Filtres de recherche -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="datetime-local"
          v-model="dateStart"
          placeholder="Début"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="datetime-local"
          v-model="dateEnd"
          placeholder="Fin"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <select
          v-model="idUtilisateur"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Sélectionner un utilisateur</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.nom }}
          </option>
        </select>
        <select
          v-model="idCryptomonnaie"
          class="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Sélectionner une cryptomonnaie</option>
          <option v-for="crypto in cryptos" :key="crypto.id" :value="crypto.id">
            {{ crypto.nom }}
          </option>
        </select>
      </div>
      <div class="mt-4 text-right">
        <button
          @click="fetchTransactions"
          class="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Rechercher
        </button>
      </div>
    </div>

    <!-- Table des transactions -->
    <div v-if="transactions.length" class="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-2xl">
      <table class="w-full min-w-full table-auto border-collapse text-left">
        <thead>
          <tr class="bg-blue-700 text-white">
            <th class="py-3 px-4 text-sm font-semibold">Date</th>
            <th class="py-3 px-4 text-sm font-semibold">Utilisateur</th>
            <th class="py-3 px-4 text-sm font-semibold">Cryptomonnaie</th>
            <th class="py-3 px-4 text-sm font-semibold">Quantité</th>
            <th class="py-3 px-4 text-sm font-semibold">Prix Unitaire</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="py-3 px-4 text-gray-700 dark:text-white">{{ transaction.dateTransaction }}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-white">{{ transaction.utilisateur.nom }}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-white">{{ transaction.cryptomonnaie.nom }}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-white">{{ transaction.quantite }}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-white">{{ transaction.prixUnitaire }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-gray-600 dark:text-gray-400 mt-4">Aucune transaction à afficher.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dateStart: null,
      dateEnd: null,
      idUtilisateur: "",
      idCryptomonnaie: "",
      transactions: [],
      users: [],
      cryptos: []
    };
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:8080/api/transactions/historique', {
          params: {
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            idUtilisateur: this.idUtilisateur || null,
            idCryptomonnaie: this.idCryptomonnaie || null
          }
        });
        this.transactions = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/api/utilisateurs/all');
        this.users = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    },
    async fetchCryptos() {
      try {
        const response = await axios.get('http://localhost:8080/api/cryptos');
        this.cryptos = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des cryptomonnaies :", error);
      }
    }
  },
  async mounted() {
    await Promise.all([
      this.fetchUsers(),
      this.fetchCryptos()
    ]);
  }
};
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