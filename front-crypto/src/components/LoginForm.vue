<template>
    <form @submit.prevent="handleLogin" class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
        <a
          href="#"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Sign Up
        </a>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  
  const handleLogin = () => {
    console.log('Login attempt with email:', email.value)
    // Here you would typically handle the login logic
  }
  </script>