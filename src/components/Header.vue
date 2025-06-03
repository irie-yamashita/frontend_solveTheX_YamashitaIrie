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

    router.push('/');
};


</script>

<template>
  <nav>
    <p v-if="username">Benvingut/da, {{ username }}!</p>
    <button @click="registrar">Registrar-se</button>
    <button @click="login">Iniciar Sessió</button>
    <button @click="logout">Log Out</button>
  </nav>
</template>


