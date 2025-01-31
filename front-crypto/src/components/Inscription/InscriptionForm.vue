<template>
    <div class="h-screen flex items-center justify-center">
      <!-- Formulaire d'inscription -->
      <form @submit.prevent="handleRegister" class="bg-gray-100 p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl text-center text-blue-900 mb-6">Inscription</h1>
  
        <!-- Nom Field -->
        <div class="mb-4">
          <input
            type="text"
            id="nom"
            v-model="nom"
            required
            placeholder="Entrez votre nom"
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
  
        <!-- Prénom Field -->
        <div class="mb-4">
          <input
            type="text"
            id="prenom"
            v-model="prenom"
            required
            placeholder="Entrez votre prénom"
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
  
        <!-- Nom d'utilisateur Field -->
        <div class="mb-4">
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Entrez votre nom d'utilisateur"
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
  
        <!-- Email Field -->
        <div class="mb-4">
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Entrez votre email"
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
  
        <!-- Date de naissance Field -->
        <div class="mb-4">
          <input
            type="date"
            id="birthdate"
            v-model="birthdate"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
  
        <!-- Genre Field -->
        <div class="mb-6">
          <select
            id="gender"
            v-model="gender"
            required
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="" disabled selected>Sélectionnez votre genre</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </select>
        </div>
  
        <button
          type="submit"
          :disabled="!isRegisterFormValid"
          class="w-full py-3 bg-blue-900 text-white rounded-md font-semibold disabled:bg-gray-400 hover:bg-blue-700 focus:outline-none"
        >
          S'inscrire
        </button>
  
        <!-- Lien vers la connexion -->
        <div class="flex justify-center mt-4">
          <a href="/" class="text-blue-900 hover:underline">Déjà un compte? Connectez-vous</a>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const nom = ref('');
  const prenom = ref('');
  const username = ref('');
  const email = ref('');
  const birthdate = ref('');
  const gender = ref('');
  
  // Utilisation de `onMounted` pour récupérer l'email depuis la query de l'URL
  onMounted(() => {
    if (router.currentRoute.value.query.email) {
      email.value = router.currentRoute.value.query.email;  // Récupère l'email depuis l'URL
    }
  });
  
  const isRegisterFormValid = computed(() => {
    return (
      nom.value.length > 0 &&
      prenom.value.length > 0 &&
      username.value.length > 0 &&
      email.value.includes('@') &&
      birthdate.value.length > 0 &&
      gender.value.length > 0
    );
  });
  
  // Handle Register
  const handleRegister = async () => {
    if (isRegisterFormValid.value) {
      try {
        const response = await axios.post('http://localhost:5092/api/utilisateur/register', {
          Nom: nom.value,
          Prenom: prenom.value,
          Username: username.value,
          Email: email.value,
          Birthdate: birthdate.value,
          Gender: gender.value,
        });
  
        if (response.status === 200) {
          console.log('Inscription réussie:', response.data);
          await router.push('/login');
        } else {
          console.error('Erreur lors de l\'inscription:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Utilisation du même style pour le formulaire */
  </style>
  