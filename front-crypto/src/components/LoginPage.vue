<template>
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold text-white text-center mb-6">
          Crypto Login
        </h1>
        <LoginForm />
      </div>
    </div>
  </template>
  
  <script setup>
  import LoginForm from './LoginForm.vue'
  </script>