<template>
    <div id="app">
      <h1>Évolution du cours de la cryptomonnaie</h1>
      <div class="card">
        <div class="form-group">
          <label for="crypto">Choisissez une cryptomonnaie :</label>
          <select id="crypto" v-model="selectedCrypto">
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="XRP">Ripple (XRP)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="period">Période :</label>
          <select id="period" v-model="selectedPeriod">
            <option value="1D">1 jour</option>
            <option value="1W">1 semaine</option>
            <option value="1M">1 mois</option>
            <option value="1Y">1 an</option>
          </select>
        </div>
      </div>
      <div class="card chart-container">
        <canvas ref="chartCanvas"></canvas>
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
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .card {
    padding: 2em;
    background-color: #1a1a1a;
    border-radius: 8px;
    margin-bottom: 1em;
  }
  
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin-bottom: 1em;
  }
  
  .form-group {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    margin-bottom: 0.5em;
    text-align: left;
  }
  
  select {
    width: 100%;
    padding: 0.6em;
    font-size: 1em;
    border-radius: 4px;
    border: 1px solid #646cff;
    background-color: #242424;
    color: white;
  }
  
  .chart-container {
    height: 400px;
  }
  
  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    .card {
      background-color: #f9f9f9;
    }
    select {
      background-color: white;
      color: #213547;
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5em;
    }
    
    .chart-container {
      height: 300px;
    }
  }
  </style>