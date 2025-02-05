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
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

// Palette de couleurs fixes
const cryptoColors = ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#6A5ACD'];

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
        text: 'Heures (12 heures)',
      },
      ticks: {
        stepSize: 1,
        callback: (value) => `${value}h`,
      },
    },
    y: {
      title: {
        display: true,
        text: 'Prix (Ariary)',
      },
      min: 0,
      max: 150000, // Échelle fixe
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

    for (const [index, crypto] of cryptos.entries()) {
      await fetch(`http://localhost:8080/api/cryptos/generate/${crypto.id}`, {
        method: 'POST',
      });

      const response = await fetch(`http://localhost:8080/api/cryptos/cours/last50/${crypto.id}`);
      const data = await response.json();

      const labels = data.map(item => new Date(item.dateCours).toLocaleTimeString());
      const dataSet = data.map(item => item.montant);

      if (allLabels.length === 0) {
        allLabels.unshift(...labels.reverse()); // Inverser les labels
      }

      datasets.push({
        label: crypto.nom,
        data: dataSet.reverse(),
        fill: true,
        borderColor: cryptoColors[index % cryptoColors.length],
        backgroundColor: getGradientColor(cryptoColors[index % cryptoColors.length]),
        tension: 0.4,
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

// Fonction pour générer un dégradé sous la courbe
const getGradientColor = (color) => {
  const ctx = document.createElement('canvas').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, `${color}80`); // Couleur transparente
  gradient.addColorStop(1, `${color}00`); // Complètement transparent
  return gradient;
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
