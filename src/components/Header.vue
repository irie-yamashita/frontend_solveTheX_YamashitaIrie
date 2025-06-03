<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref(localStorage.getItem('username') || ''); // Inicialitza amb el valor de localStorage

// Funció per portar a la pàgina de registre
const registrar = () => {
    router.push('/registre');
};

// Funció per portar a la pàgina de log in
const login = async () => {
    router.push('/login');
    username.value = localStorage.getItem('username');
};


// Funció per tancar sessió
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    username.value = ''; 

    router.push('/login');
};

// Funció per tancar sessió
const home = () => {
    router.push('/');
};


</script>

<template>
  <header class="w-full flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
    <img src="" alt="Logo" class="h-10 w-auto cursor-pointer" @click="home">
    <nav class="flex items-center space-x-6">
      <div class="flex space-x-6">
        <span v-if="!username" @click="registrar" class="cursor-pointer hover:text-blue-500 transition">Registrar-se</span>
        <span v-if="!username" @click="login" class="cursor-pointer hover:text-blue-500 transition">Iniciar Sessió</span>
        <span v-if="username" @click="logout" class="cursor-pointer hover:text-red-500 transition">Log Out</span>
      </div>
      <p v-if="username" class="font-semibold text-gray-700">Benvingut/da, {{ username }}!</p>
      
    </nav>
  </header>
  
</template>


