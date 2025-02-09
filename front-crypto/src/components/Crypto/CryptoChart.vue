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
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler } from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler);

// Données et options du graphique
const chartData = ref({});
const chartOptions = ref({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Prix des Cryptomonnaies',
    },
    legend: {
      position: 'top',
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

// Fonction pour générer une couleur plus vive à partir d'un nombre (id)
const generateColorFromNumber = (number) => {
  // Calcul pour obtenir une couleur vive
  const r = (number * 30 + 100) % 256; // Augmentation de la composante rouge pour rendre la couleur plus vive
  const g = (number * 80 + 150) % 256; // Augmentation de la composante verte
  const b = (number * 100 + 200) % 256; // Augmentation de la composante bleue
  return `rgb(${r}, ${g}, ${b})`; // Retourner une couleur RGB vive
};

// Fonction pour générer un dégradé sous la courbe avec des couleurs vives
const getGradientColor = (color) => {
  const ctx = document.createElement('canvas').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);

  // Extraire les valeurs RGB de la couleur
  const [r, g, b] = color.match(/\d+/g);
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.7)`); // Couleur plus vive avec alpha à 0.7
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`); // Couleur plus douce et plus transparente à la fin

  return gradient;
};

// Fonction pour charger les données du graphique
const fetchCryptoPrices = async () => {
  try {
    const cryptosResponse = await fetch('http://localhost:8080/api/cryptos');
    const cryptos = await cryptosResponse.json();

    const allLabels = [];
    const datasets = [];

    for (let i = 0; i < cryptos.length; i++) {
      const crypto = cryptos[i];

      const response = await fetch(`http://localhost:8080/api/cryptos/cours/last50/${crypto.id}`);
      const data = await response.json();

      const labels = data.map(item => new Date(item.dateCours).toLocaleTimeString());
      const dataSet = data.map(item => item.montant);

      if (allLabels.length === 0) {
        allLabels.unshift(...labels.reverse());
      }

      // Générer une couleur unique pour chaque crypto en fonction de son id
      const color = generateColorFromNumber(crypto.id);

      datasets.push({
        label: crypto.nom,
        data: dataSet.reverse(),
        fill: true,
        borderColor: color,
        backgroundColor: getGradientColor(color),
        tension: 0.3,
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

// Rafraîchir les données toutes les 5 secondes
let interval;
onMounted(() => {
  fetchCryptoPrices();
  interval = setInterval(fetchCryptoPrices, 5000);
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
