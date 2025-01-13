<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <input
        type="email"
        id="email"
        v-model="email"
        required
        placeholder="Enter your email"
      />
    </div>
    <button type="submit" :disabled="!isFormValid">Login</button>
    <div class="links">
      <a href="#">Mot de passe oublié?</a>
      <a href="#">Creer un compte</a>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

const isFormValid = computed(() => {
  return email.value.includes('@');
});

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('login', { email: email.value});
  }
};

const emit = defineEmits(['login']);
</script>

<style scoped>
.login-form {
  /* background-color: #2a2a2a; */
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
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
  border: 1px solid #444;
  /* background-color: #333; */
  color: #444;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0F2573;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background-color: #0F2573;
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