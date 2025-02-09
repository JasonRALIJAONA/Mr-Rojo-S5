<template>
    <div class="h-screen flex items-center justify-center">
      <!-- Formulaire Login -->
      <form v-if="!isPinFormVisible" @submit.prevent="handleLogin" class="bg-gray-100 p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl text-center text-blue-900 mb-6">Login Admin</h1>

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
        <div class="mb-6">
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Entrez votre mot de passe"
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
        <button
          type="submit"
          :disabled="!isLoginFormValid || isLoading"
          class="w-full py-3 bg-blue-900 text-white rounded-md font-semibold disabled:bg-gray-400 hover:bg-blue-700 focus:outline-none"
        >
          <span v-if="isLoading" class="flex justify-center items-center">
            <svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.373 0 2 4.373 2 10h2z"></path>
            </svg>
            Chargement...
          </span>
          <span v-else>Continuer avec l'idP</span>
        </button>
  
      </form>
  
      <!-- Formulaire PIN -->
      <form v-if="isPinFormVisible" @submit.prevent="handlePinSubmit" class="bg-gray-100 p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl text-center text-blue-900 mb-6">Validation du PIN</h1>
  
        <!-- PIN Field -->
        <div class="mb-4">
          <input
            type="password"
            id="pin"
            v-model="pin"
            required
            placeholder="Entrez votre PIN"
            maxlength="6"
            class="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
        <button
          type="submit"
          :disabled="!isPinFormValid"
          class="w-full py-3 bg-blue-900 text-white rounded-md font-semibold disabled:bg-gray-400 hover:bg-blue-700 focus:outline-none"
        >
          Valider
        </button>
      </form>
    </div>
</template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const isLoading = ref(false);
  const router = useRouter();
  const email = ref('admin.girard@yopmail.com');
  const password = ref('adminpass123');
  const pin = ref('');
  const isPinFormVisible = ref(false); // Contrôle l'affichage du formulaire PIN
  const isLoginFormValid = computed(() => {
    return email.value.includes('@') && password.value.length > 0;
  });
  const isPinFormValid = computed(() => pin.value.length === 5);
  
  // Handle Login
  const handleLogin = async () => {
    if (isLoginFormValid.value) {
      isLoading.value = true; // Activer le chargement
      try {
        const response = await axios.post('http://localhost:5093/api/utilisateur/login', {
          Email: email.value,
          Password: password.value,
        });

        if (response.status === 200) {
          console.log('Login success:', response.data);
          isPinFormVisible.value = true;
        } else {
          console.error('Erreur de login:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      } finally {
        isLoading.value = false; // Désactiver le chargement
      }
    }
  };

  
  // Handle PIN submission
  const handlePinSubmit = async () => {
    if (isPinFormValid.value) {
      try {
        const response = await axios.post('http://localhost:5093/api/utilisateur/ValiderPin', {
          Pin: pin.value,
          Email: email.value,
        });
  
        if (response.status === 200) {
          console.log('PIN validé:', response.data);
          await verifierUser();
        }else {
          console.error('Erreur de validation du PIN:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la validation du PIN:', error);
      }
    }
  };
  const verifierUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/utilisateurs', {
        params: { email: email.value }
      });
  
      if (response.status === 200 && response.data) {
        const {token ,role} = response.data;
  
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userRole', role);
          console.log('Token stocké avec succès:', token);
        }
        await router.push('/home/ValidationMvtFond');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('Utilisateur non trouvé, redirection vers InscriptionPage');
        await router.push({ path: '/InscriptionPage', query: { email: email.value } });
      } else {
        console.error('Erreur lors de l\'appel à l\'API:', error);
      }
    }
  };
  
  </script>
  
  <style scoped>
  /* Utilisation du même style pour les deux formulaires */
  </style>
  