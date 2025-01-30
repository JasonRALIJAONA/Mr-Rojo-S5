<template>
  <div class="h-screen flex items-center justify-center">
    <form @submit.prevent="handleSubmit" class="bg-gray-100 p-8 rounded-lg shadow-md w-96">
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
        :disabled="!isFormValid" 
        class="w-full py-3 bg-blue-900 text-white rounded-md font-semibold disabled:bg-gray-400 hover:bg-blue-700 focus:outline-none"
      >
        Login
      </button>

      <!-- Links -->
      <div class="flex justify-between mt-4">
        <a href="#" class="text-blue-900 hover:underline">Mot de passe oublié?</a>
        <a href="#" class="text-blue-900 hover:underline">Créer un compte</a>
      </div>
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
const isFormValid = computed(() => {
  // Validation simple : email doit contenir un "@" et le mot de passe doit être présent
  return email.value.includes('@') && password.value.length > 0;
});

// Handle form submission
const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      // Envoi des données via Axios à l'API
      const response = await axios.post('http://localhost:5092/api/utilisateur/login', {
        Email: email.value,
        Password: password.value,
      });

      // Vérifier la réponse de l'API
      if (response.status === 200) {
        console.log('Login success:', response.data);
        // Rediriger l'utilisateur vers la page des ventes après une connexion réussie
        await router.push({ path: '/validerPin', query: { email: email.value } });
      } else {
        console.error('Erreur de login:', response.data);
        // Tu peux ajouter ici une gestion d'erreur (ex : afficher un message d'erreur)
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Gérer l'erreur, par exemple afficher un message d'erreur dans l'interface
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS prend déjà en charge le centrage et la mise en page */
</style>
