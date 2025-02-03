<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      Cours des Cryptomonnaies
    </h2>

    <div v-if="chartData.labels && chartData.labels.length > 0">
      <LineChart :data="chartData" :options="chartOptions" />
    </div>
    <p v-else class="text-gray-600 dark:text-gray-400 mt-4">
      Aucune donnée disponible pour afficher.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

// Données et options du graphique
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
        text: 'Prix (Ariary)',
      },
    },
  },
});

// Fonction pour charger les données du graphique
const fetchCryptoPrices = async () => {
  try {
    const cryptosResponse = await fetch('http://localhost:8080/api/cryptos');
    const cryptos = await cryptosResponse.json();

    const allLabels = [];
    const datasets = [];

    for (const crypto of cryptos) {
      // Générer le cours pour chaque crypto
      await fetch(`http://localhost:8080/api/cryptos/generate/${crypto.id}`, {
        method: 'POST',
      });

      const response = await fetch(`http://localhost:8080/api/cryptos/cours/last50/${crypto.id}`);
      const data = await response.json();

      const labels = data.map(item => new Date(item.dateCours).toLocaleTimeString());
      const dataSet = data.map(item => item.montant);

      if (allLabels.length === 0) {
        allLabels.push(...labels);
      }

      datasets.push({
        label: crypto.nom,
        data: dataSet,
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1,
      });
    }

    chartData.value = {
      labels: allLabels,
      datasets: datasets,
    };
  } catch (error) {
    console.error('Erreur lors du chargement des cours :', error);
  }
};

// Fonction pour générer une couleur aléatoire
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Rafraîchir les données toutes les 10 secondes
let interval;
onMounted(() => {
  fetchCryptoPrices();
  interval = setInterval(fetchCryptoPrices, 10000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<script>
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
