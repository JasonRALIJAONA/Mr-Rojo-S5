<template>
  <div class="login-container">
    <AppLogo />
    <LoginForm @login="handleLogin" />
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppLogo from './../Statics/Logo.vue';
import LoginForm from './LoginForm.vue';
import AppFooter from './../Statics/Footer.vue';

const handleLogin = (credentials) => {
  // Here you would typically call an API to authenticate the user
  console.log('Login attempted with:', credentials);
  // For demo purposes, we'll just log the credentials
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* background-color: #1a1a1a; */
  color: #ffffff;
  font-family: Arial, sans-serif;
}
</style>