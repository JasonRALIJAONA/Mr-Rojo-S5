<template>
  <div class="crypto-section">
    <h2 class="title">{{ title }}</h2>
    <div v-if="cryptos.length" class="table-container">
      <table class="crypto-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Symbole</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in cryptos" :key="crypto.id" class="crypto-row">
            <td class="name-cell">
              <div class="crypto-name">
                <span class="crypto-icon">{{ crypto.nom.charAt(0) }}</span>
                {{ crypto.nom }}
              </div>
            </td>
            <td class="price-cell">{{ crypto.symbole }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Aucune cryptomonnaie trouvée.</p>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';

const cryptos = ref([]);
const title = 'Liste des cryptomonnaies';

const fetchCryptos = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/cryptos');
    if (response.ok) {
      cryptos.value = await response.json();
    } else {
      console.error('Erreur lors du chargement des cryptomonnaies.');
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
};

onMounted(fetchCryptos);
</script>

  
  <style scoped>
  .crypto-section {
    padding: 2rem;
    max-width: 1200px; /* Increased from default */
    margin: 0 auto;
    width: 90%; /* Added to ensure some margin on the sides */
  }
  
  .title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
    font-weight: 600;
    text-align: left;
  }
  
  .table-container {
    width: 100%;
    overflow-x: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .crypto-table {
    width: 100%;
    min-width: 800px; /* Added minimum width to prevent squishing */
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  .crypto-table th,
  .crypto-table td {
    padding: 1.25rem 2rem; /* Increased horizontal padding */
  }
  
  .crypto-table th {
    background-color: #0F2573;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }
  
  .crypto-table th:first-child {
    border-top-left-radius: 12px;
  }
  
  .crypto-table th:last-child {
    border-top-right-radius: 12px;
  }
  
  .crypto-row {
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #edf2f7;
  }
  
  .crypto-row:last-child {
    border-bottom: none;
  }
  
  .crypto-row:hover {
    background-color: #f8fafc;
  }
  
  .name-cell {
    font-weight: 500;
    color: #2d3748;
    width: 40%; /* Added to give more space to the name column */
  }
  
  .crypto-name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .crypto-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: #0F2573;
    color: white;
    border-radius: 50%;
    font-weight: bold;
  }
  
  .price-cell {
    font-family: 'Monaco', monospace;
    color: #2d3748;
    font-weight: 500;
    width: 30%; /* Added to balance column widths */
  }
  
  .change-cell {
    text-align: right;
    width: 30%; /* Added to balance column widths */
  }
  
  .change-indicator {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .positive {
    background-color: #def7ec;
    color: #03543f;
  }
  
  .negative {
    background-color: #fde8e8;
    color: #9b1c1c;
  }
  
  @media (max-width: 1024px) {
    .crypto-section {
      width: 95%;
      padding: 1rem;
    }
  }
  
  @media (max-width: 640px) {
    .crypto-section {
      width: 100%;
      padding: 0.5rem;
    }
  
    .title {
      font-size: 1.5rem;
      padding: 0 1rem;
    }
  
    .crypto-table th,
    .crypto-table td {
      padding: 1rem;
    }
  
    .crypto-icon {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.875rem;
    }
  }
  </style>