<template>
  <div class="h-screen flex items-center justify-center">
    <!-- Formulaire Login -->
    <form v-if="!isPinFormVisible" @submit.prevent="handleLogin" class="bg-gray-100 p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl text-center text-blue-900 mb-6">Login</h1>

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
        :disabled="!isLoginFormValid"
        class="w-full py-3 bg-blue-900 text-white rounded-md font-semibold disabled:bg-gray-400 hover:bg-blue-700 focus:outline-none"
      >
        Continuer avec l'idP
      </button>

      <!-- Links -->
      <div class="flex justify-between mt-4">
        <a href="#" class="text-blue-900 hover:underline">Mot de passe oublié?</a>
        <!-- <a href="InscriptionPage" class="text-blue-900 hover:underline">Créer un compte</a> -->
      </div>
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

const router = useRouter();
const email = ref('');
const password = ref('');
const pin = ref('');
const isPinFormVisible = ref(false); // Contrôle l'affichage du formulaire PIN
const isLoginFormValid = computed(() => {
  return email.value.includes('@') && password.value.length > 0;
});
const isPinFormValid = computed(() => pin.value.length === 5);

// Handle Login
const handleLogin = async () => {
  if (isLoginFormValid.value) {
    try {
      const response = await axios.post('http://localhost:5093/api/utilisateur/login', {
        Email: email.value,
        Password: password.value,
      });

      if (response.status === 200) {
        console.log('Login success:', response.data);
        // Transition vers la validation du PIN après une connexion réussie
        isPinFormVisible.value = true;
      } else {
        console.error('Erreur de login:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
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
        // await router.push('/home:listeCrypto');
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
    // Envoie la requête GET avec le paramètre email dans l'URL
    const user = await axios.get('http://localhost:8080/api/utilisateurs', {
      params: { email: email.value }
    });

    // Si l'utilisateur est trouvé, on passe à la page home
    if (user.status === 200) {
      console.log('Utilisateur trouvé:', user.data);
      await router.push('/home/listeCrypto'); // Correction du chemin ici
    } 
    // Si l'utilisateur n'est pas trouvé (404), on redirige vers la page d'inscription
    else {
      console.error('Erreur lors de la récupération de l\'utilisateur:', user.data);
    }
  } catch (error) {
    if (user.status === 404) {
      console.log('Utilisateur non trouvé, redirection vers InscriptionPage');
      await router.push({ path: '/InscriptionPage', query: { email: email.value } });
    } 
    console.error('Erreur lors de l\'appel à l\'API:', error);
    console.log('Utilisateur non trouvé, redirection vers InscriptionPage');
    await router.push({ path: '/InscriptionPage', query: { email: email.value } });
  }
};
</script>

<style scoped>
/* Utilisation du même style pour les deux formulaires */
</style>
