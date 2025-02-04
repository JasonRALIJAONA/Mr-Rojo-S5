<template>
    <div>
      <h2>Historique des transactions</h2>
      <div>
        <input type="datetime-local" v-model="dateStart" placeholder="Début">
        <input type="datetime-local" v-model="dateEnd" placeholder="Fin">
        <input type="number" v-model="idUtilisateur" placeholder="ID Utilisateur">
        <input type="number" v-model="idCryptomonnaie" placeholder="ID Cryptomonnaie">
        <button @click="fetchTransactions">Rechercher</button>
      </div>
      <table v-if="transactions.length">
        <thead>
          <tr>
            <th>Date</th>
            <th>Utilisateur</th>
            <th>Cryptomonnaie</th>
            <th>Quantité</th>
            <th>Prix Unitaire</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.dateTransaction }}</td>
            <td>{{ transaction.utilisateur.nom }}</td>
            <td>{{ transaction.cryptomonnaie.nom }}</td>
            <td>{{ transaction.quantite }}</td>
            <td>{{ transaction.prixUnitaire }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        dateStart: null,
        dateEnd: null,
        idUtilisateur: null,
        idCryptomonnaie: null,
        transactions: []
      };
    },
    methods: {
      async fetchTransactions() {
        try {
          const response = await axios.get('http://localhost:8080/api/transactions/historique', {
            params: {
              dateStart: this.dateStart,
              dateEnd: this.dateEnd,
              idUtilisateur: this.idUtilisateur,
              idCryptomonnaie: this.idCryptomonnaie
            }
          });
          this.transactions = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des transactions :", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  