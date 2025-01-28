<template>
  <div class="login-page">
    <div class="login-container">
      <div class="image-section">
        <img src="../../assets/imagecrypto.jpg" alt="Crypto" class="hero-image">
        <div class="image-overlay"></div>
      </div>
      
      <div class="form-section">
        <!-- <AppLogo class="logo" /> -->
        <LoginForm @login="handleLogin" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppLogo from './../Statics/Logo.vue';
import LoginForm from './LoginForm.vue';
import AppFooter from './../Statics/Footer.vue';

const handleLogin = (credentials) => {
  console.log('Login attempted with:', credentials);
  if (isFormValid.value) {
    router.push('/ListeVente');
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-container {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}

.image-section {
  width: 50%;
  position: relative;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-section:hover .hero-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

.form-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a 10%, #000566 100%);
}

.logo {
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .image-section,
  .form-section {
    width: 100%;
  }

  .image-section {
    height: 200px;
  }
}
</style>