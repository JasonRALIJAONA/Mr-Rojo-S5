<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h1 class="form-title">Login</h1>

    <!-- Email Field -->
    <div class="form-group">
      <input
        type="email"
        id="email"
        v-model="email"
        required
        placeholder="Entrez votre email"
      />
      <input
        type="password"
        id="password"
        v-model="password"
        required
        placeholder="Entrez votre mot de passe"
      />
    </div>
    <button type="submit" :disabled="!isFormValid">Login</button>

    <!-- Links -->
    <div class="links">
      <a href="#">Mot de passe oublié?</a>
      <a href="#">Créer un compte</a>
    </div>
  </form>
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
.login-form {
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

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #0F2573;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  color: #444;
  border-radius: 4px;
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

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

a {
  color: #0F2573;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
