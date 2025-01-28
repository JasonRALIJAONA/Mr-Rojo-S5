<template>
    <div id="app">
      <h1>Gestion des Fonds</h1>
      <div class="card">
        <form @submit.prevent="soumettreFormulaire">
          <div class="form-group">
            <label for="montant">Montant :</label>
            <input
              type="number"
              id="montant"
              v-model="montant"
              step="0.01"
              required
            />
          </div>
          <div class="form-group">
            <label>Type de transaction :</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="typeTransaction" value="depot" />
                Dépôt
              </label>
              <label>
                <input type="radio" v-model="typeTransaction" value="retrait" />
                Retrait
              </label>
            </div>
          </div>
          <button type="submit">Soumettre</button>
        </form>
      </div>
      <div class="card" v-if="message">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const montant = ref(0);
  const typeTransaction = ref('depot');
  const message = ref('');
  
  const soumettreFormulaire = () => {
    if (montant.value <= 0) {
      message.value = 'Veuillez entrer un montant valide.';
      return;
    }
  
    if (typeTransaction.value === 'depot') {
      message.value = `Dépôt de ${montant.value}€ effectué avec succès.`;
    } else {
      message.value = `Retrait de ${montant.value}€ effectué avec succès.`;
    }
  
    // Réinitialisation du formulaire
    montant.value = 0;
    typeTransaction.value = 'depot';
  };
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
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    margin-bottom: 1em;
    width: 100%;
    max-width: 300px;
  }
  
  label {
    display: block;
    margin-bottom: 0.5em;
    text-align: left;
  }
  
  input[type="number"] {
    width: 100%;
    padding: 0.6em;
    font-size: 1em;
    border-radius: 4px;
    border: 1px solid #646cff;
    background-color: #242424;
    color: white;
  }
  
  .radio-group {
    display: flex;
    justify-content: space-between;
  }
  
  .radio-group label {
    display: flex;
    align-items: center;
  }
  
  input[type="radio"] {
    margin-right: 0.5em;
  }
  
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #646cff;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  
  button:hover {
    border-color: #747bff;
  }
  
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
  
  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    .card {
      background-color: #f9f9f9;
    }
    input[type="number"] {
      background-color: white;
      color: #213547;
    }
    button {
      background-color: #f9f9f9;
    }
  }
  </style>