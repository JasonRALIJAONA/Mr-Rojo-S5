<template>
  <div id="app" class="max-w-7xl mx-auto p-8 text-center">
    <h1 class="text-4xl font-bold mb-8">Évolution du cours de la cryptomonnaie</h1>
    <div class="bg-gray-900 p-8 rounded-lg mb-6">
      <div class="mb-4">
        <label for="crypto" class="block text-left mb-2 text-white">Choisissez une cryptomonnaie :</label>
        <select id="crypto" v-model="selectedCrypto" class="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600">
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="XRP">Ripple (XRP)</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="period" class="block text-left mb-2 text-white">Période :</label>
        <select id="period" v-model="selectedPeriod" class="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600">
          <option value="1D">1 jour</option>
          <option value="1W">1 semaine</option>
          <option value="1M">1 mois</option>
          <option value="1Y">1 an</option>
        </select>
      </div>
    </div>

    <div class="bg-gray-900 rounded-lg p-4">
      <div class="chart-container h-96">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const selectedCrypto = ref('BTC');
const selectedPeriod = ref('1W');
const chartCanvas = ref(null);
let chart = null;

const generateRandomData = (days) => {
  const data = [];
  let value = 10000;
  for (let i = 0; i < days; i++) {
    value = value + Math.random() * 1000 - 500;
    data.push({ x: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000), y: value });
  }
  return data;
};

const updateChart = () => {
  const days = selectedPeriod.value === '1D' ? 1 : 
               selectedPeriod.value === '1W' ? 7 : 
               selectedPeriod.value === '1M' ? 30 : 365;

  const data = generateRandomData(days);

  if (chart) {
    chart.data.datasets[0].data = data;
    chart.options.scales.x.time.unit = selectedPeriod.value === '1D' ? 'hour' : 'day';
    chart.update();
  } else {
    chart = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        datasets: [{
          label: `Prix ${selectedCrypto.value}`,
          data: data,
          borderColor: '#646cff',
          backgroundColor: 'rgba(100, 108, 255, 0.2)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: selectedPeriod.value === '1D' ? 'hour' : 'day'
            }
          },
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
};

onMounted(() => {
  updateChart();
});

watch([selectedCrypto, selectedPeriod], () => {
  updateChart();
});
</script>

<style scoped>
/* Aucun style CSS supplémentaire nécessaire, tout est géré par Tailwind */
</style>
