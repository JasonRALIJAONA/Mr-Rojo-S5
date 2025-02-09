<template>
  <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Navbar -->
    <nav class="bg-blue-700 text-white py-4 shadow-md">
      <div class="flex justify-between items-center px-6">
        <div class="text-2xl font-extrabold tracking-wide">Crypto</div>
        <ul class="flex space-x-6">
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
          <li v-if="isUser">
            <router-link to="/home/GestionFonds" class="hover:text-yellow-300 transition">
              Gestion Fonds
            </router-link>
          </li>
          <li>
            <router-link to="/home/historiqueTransaction" class="hover:text-yellow-300 transition">
              Historique Transaction
            </router-link>
          </li>
          <li v-if="isAdmin">
            <router-link to="/home/ValidationMvtFond" class="hover:text-yellow-300 transition">
              Validation Mvt Fond
            </router-link>
          </li>
          <li>
            <router-link to="/home/ListeVente" class="hover:text-yellow-300 transition">
              Cours Actuel Crypto
            </router-link>
          </li>
        </ul>
        <div class="flex items-center space-x-4">
          <span v-if="fondActuel !== null && isUser"class="text-yellow-300 font-bold">
            Fond Actuel: {{ fondActuel }} ariary
          </span>
          <button @click="toggleDarkMode" class="p-2 bg-gray-700 rounded text-white">
            <component :is="isDarkMode ? 'MoonIcon' : 'SunIcon'" class="w-6 h-6" />
          </button>
        </div>
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
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  const fondActuel = ref(null);
  const route = useRoute();

  const loadFondActuel = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/MvtFond/fond`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      fondActuel.value = response.data.fondActuel || 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du fond:', error);
    }
  };

  onMounted(loadFondActuel);
</script>

<script>
import { SunIcon, MoonIcon } from '@heroicons/vue/solid';

export default {
  name: "BaseLayout",
  data() {
    return {
      isDarkMode: false,
      SunIcon,
      MoonIcon,
      isAdmin: localStorage.getItem('userRole') === 'Administrateur',
      isUser: localStorage.getItem('userRole') === 'Utilisateur',
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
