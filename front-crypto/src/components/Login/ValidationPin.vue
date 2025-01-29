<template>
    <form @submit.prevent="handleSubmit" class="pin-form">
      <h1 class="form-title">Validation du PIN</h1>
  
      <!-- PIN Input Field -->
      <div class="form-group">
        <input
          type="password"
          id="pin"
          v-model="pin"
          required
          placeholder="Entrez votre PIN"
          maxlength="6"
        />
      </div>
      <button type="submit" :disabled="!isFormValid">Valider</button>
    </form>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import axios from 'axios';
  
  const pin = ref('');
  const isFormValid = computed(() => pin.value.length === 6);
  
  const handleSubmit = async () => {
    if (isFormValid.value) {
      try {
        const response = await axios.post('http://localhost:5092/api/utilisateur/valider-pin', {
          Pin: pin.value,
        });
  
        if (response.status === 200) {
          console.log('PIN validé:', response.data);
        } else {
          console.error('Erreur de validation du PIN:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la validation du PIN:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .pin-form {
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    width: 350px;
    margin: 2rem auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #0F2573;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    color: #444;
    border-radius: 4px;
    text-align: center;
    font-size: 1.2rem;
  }
  
  button {
    width: 105%;
    padding: 0.75rem;
    background-color: #0F2573;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0d1f5b;
  }
  
  button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  </style>
  