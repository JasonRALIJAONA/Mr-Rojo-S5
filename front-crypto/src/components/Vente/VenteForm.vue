<template>
    <div class="sell-crypto-form">
      <h2 class="form-title">Vendre des Cryptomonnaies</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="crypto">Cryptomonnaie</label>
          <select id="crypto" v-model="selectedCrypto" required>
            <option value="" disabled>Choisissez une cryptomonnaie</option>
            <option v-for="crypto in cryptos" :key="crypto.id" :value="crypto.id">
              {{ crypto.name }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="amount">Quantité</label>
          <input
            id="amount"
            type="number"
            v-model="amount"
            min="0"
            step="0.01"
            placeholder="Entrez la quantité"
            required
          />
        </div>
  
        <button type="submit" class="form-button">Vendre</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const cryptos = ref([
    { id: 'btc', name: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum' },
    { id: 'ada', name: 'Cardano' },
    { id: 'doge', name: 'Dogecoin' },
    { id: 'dot', name: 'Polkadot' },
  ]);
  
  const selectedCrypto = ref('');
  const amount = ref(0);
  
  const handleSubmit = () => {
    if (selectedCrypto.value && amount.value > 0) {
      alert(`Vous avez vendu ${amount.value} unités de ${selectedCrypto.value}.`);
      selectedCrypto.value = '';
      amount.value = 0;
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  };
  </script>
  
  <style scoped>
  .sell-crypto-form {
    max-width: 400px;
    margin: 2rem auto;
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    font-size: 1.5rem;
    color: #0F2573;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  select,
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
  }
  
  select:focus,
  input:focus {
    outline: none;
    border-color: #0F2573;
    box-shadow: 0 0 5px rgba(15, 37, 115, 0.2);
  }
  
  .form-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #0F2573;
    color: #ffffff;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .form-button:hover {
    background-color: #093061;
  }
  </style>
  