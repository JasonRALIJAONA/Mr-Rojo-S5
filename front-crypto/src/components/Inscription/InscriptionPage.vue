<template>
    <div class="min-h-screen flex flex-col bg-gray-800">
      <div class="flex flex-1 w-full max-w-[90%] mx-auto my-20 overflow-hidden shadow-lg rounded-lg">
        <!-- Section Image -->
        <div class="w-1/2 relative hidden lg:block">
          <img src="../../assets/imagecrypto.jpg" alt="Crypto" class="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
          <div class="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10"></div>
        </div>
  
        <!-- Section Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div class="w-full max-w-lg">
            <!-- Logo Section -->
            <!-- <AppLogo class="mb-8" /> -->
            <InscriptionForm @register="handleRegister" />
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <AppFooter />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AppLogo from './../Statics/Logo.vue';
  import InscriptionForm from './InscriptionForm.vue'; // Importez le composant InscriptionForm
  import AppFooter from './../Statics/Footer.vue';
  
  const handleRegister = (userData) => {
    console.log('Register attempted with:', userData);
    // Exemple de logique après l'inscription
    // Vous pouvez rediriger l'utilisateur vers une autre page ou afficher un message de succès
  };
  </script>
  
  <style scoped>
  /* Styles scoped to component */
  </style>