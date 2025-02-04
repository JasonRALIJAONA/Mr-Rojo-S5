<template>
  <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Navbar -->
    <nav class="bg-blue-700 text-white py-4 shadow-md">
      <div class="flex justify-between items-center px-6">
        <div class="text-2xl font-extrabold tracking-wide">Crypto</div>
        <ul class="flex space-x-6">
          <li>
            <router-link to="/home/VenteForm" class="hover:text-yellow-300 transition">
              Ajout Vente
            </router-link>
          </li>
          <li>
            <router-link to="/home/ListeVente" class="hover:text-yellow-300 transition">
              Liste Vente
            </router-link>
          </li>
          <li>
            <router-link to="/home/listeCrypto" class="hover:text-yellow-300 transition">
              Liste Crypto
            </router-link>
          </li>
          <li>
            <router-link to="/home/CryptoChart" class="hover:text-yellow-300 transition">
              Crypto Chart
            </router-link>
          </li>
          <li>
            <router-link to="/home/GestionFonds" class="hover:text-yellow-300 transition">
              Gestion Fonds
            </router-link>
          </li>
          <li>
            <router-link to="/home/historiqueTransaction" class="hover:text-yellow-300 transition">
              Historique Transaction
            </router-link>
          </li>
        </ul>
        <button @click="toggleDarkMode" class="ml-4 p-2 bg-gray-700 rounded text-white">
          <component :is="isDarkMode ? 'MoonIcon' : 'SunIcon'" class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <!-- Content Section -->
    <main class="flex-grow p-6 overflow-y-auto">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
  import AppFooter from './Statics/Footer.vue';
</script>

<script>
import { SunIcon, MoonIcon } from '@heroicons/vue/solid';

export default {
  name: "BaseLayout",
  data() {
    return {
      isDarkMode: false,
      SunIcon,
      MoonIcon
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
      localStorage.setItem('darkMode', this.isDarkMode);
    },
  },
  mounted() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = savedDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  },
};
</script>

<style scoped>
/* Optionnel, pour s'assurer que les éléments de la navbar sont bien alignés */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
