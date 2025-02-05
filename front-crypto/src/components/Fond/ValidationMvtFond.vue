<template>
    <div class="container mx-auto py-8">
      <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-8">Gestion des Mouvements de Fond</h2>
  
      <!-- Message de succès ou d'erreur -->
      <div v-if="message" class="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-4">
        <p class="text-green-700 dark:text-green-300">{{ message }}</p>
      </div>
  
      <!-- Liste des mouvements non validés -->
      <div v-if="mvtFonds.length" class="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-2xl">
        <table class="w-full min-w-full table-auto border-collapse text-left">
          <thead>
            <tr class="bg-blue-700 text-white">
              <th class="py-3 px-4 text-sm font-semibold">Nom Utilisateur</th>
              <th class="py-3 px-4 text-sm font-semibold">Nom</th>
              <th class="py-3 px-4 text-sm font-semibold">Prénom</th>
              <th class="py-3 px-4 text-sm font-semibold">Montant Dépôt</th>
              <th class="py-3 px-4 text-sm font-semibold">Montant Retrait</th>
              <th class="py-3 px-4 text-sm font-semibold">Date</th>
              <th class="py-3 px-4 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mvt in mvtFonds" :key="mvt.id" class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="py-3 px-4 text-gray-700 dark:text-white">{{ mvt.utilisateur.nomUtilisateur }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-white">{{ mvt.utilisateur.nom }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-white">{{ mvt.utilisateur.prenom }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-white">{{ mvt.depot > 0 ? mvt.depot : '-' }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-white">{{ mvt.retrait > 0 ? mvt.retrait : '-' }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-white">{{ formatDate(mvt.dateMvt) }}</td>
              <td class="py-3 px-4 text-right">
                <button
                  @click="validerMvt(mvt.id)"
                  class="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                >
                  Valider
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <p v-else class="text-gray-600 dark:text-gray-400 mt-4">Aucun mouvement non validé à afficher.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const mvtFonds = ref([]);
  const message = ref('');
  const router = useRouter();
  
  // Fonction pour formater la date et l'heure
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const timePart = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return `${datePart} à ${timePart}`;
  };
  
  // Fonction pour récupérer les mouvements de fond non validés
  const fetchMvtFondsNonValides = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        await router.push('/');
        message.value = 'Token manquant, veuillez vous reconnecter.';
        return;
      }
  
      const response = await axios.get('http://localhost:8080/api/MvtFond/mvt-fond/non-valide', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      mvtFonds.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des mouvements:', error);
      message.value = 'Erreur lors de la récupération des mouvements de fond.';
    }
  };
  
  // Fonction pour valider un mouvement de fond
  const validerMvt = async (idMvtFond) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        await router.push('/');
        message.value = 'Token manquant, veuillez vous reconnecter.';
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/api/MvtFond/validerMvtFond?idMvtFond=${idMvtFond}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      message.value = response.data.message || 'Validation réussie.';
      fetchMvtFondsNonValides(); // Rechargement des mouvements après validation
    } catch (error) {
      console.error('Erreur lors de la validation du mouvement:', error);
      message.value = 'Erreur lors de la validation du mouvement.';
    }
  };
  
  // Charger les mouvements non validés lors du chargement de la page
  fetchMvtFondsNonValides();
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
  