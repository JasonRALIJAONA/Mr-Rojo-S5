<template>
    <div class="container mx-auto py-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Cours des Cryptomonnaies</h2>
  
      <div v-if="chartData.labels && chartData.labels.length > 0">
        <LineChart :data="chartData" :options="chartOptions" />
      </div>
      <p v-else class="text-gray-600 dark:text-gray-400 mt-4">Aucune donnée disponible pour afficher.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
  
  // Enregistrement des composants Chart.js
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);
  
  // Données du graphique
  const chartData = ref({});
  const chartOptions = ref({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Prix des Cryptomonnaies',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Prix (USD)',
        },
      },
    },
  });
  
  // Données statiques pour le graphique (par exemple, les 7 derniers jours)
  const staticData = [
    ['2025-01-23', 35000],
    ['2025-01-24', 35500],
    ['2025-01-25', 36000],
    ['2025-01-26', 35500],
    ['2025-01-27', 35800],
    ['2025-01-28', 34000],
    ['2025-01-29', 34500],
  ];
  
  // Fonction pour charger les données du graphique
  const fetchCryptoPrices = () => {
    const labels = staticData.map(item => item[0]);
    const dataSet = staticData.map(item => item[1]);
  
    chartData.value = {
      labels: labels,
      datasets: [
        {
          label: 'Bitcoin (USD)',
          data: dataSet,
          fill: false,
          borderColor: '#ff6600',
          tension: 0.1,
        },
      ],
    };
  };
  
  // Charger les données statiques du graphique au montage
  onMounted(fetchCryptoPrices);
  </script>
  
  <script>
  // Déclaration de l'exportation du graphique
  export default {
    components: {
      LineChart: Line,
    },
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
  