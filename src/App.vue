<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue';

import Footer from './components/Footer.vue';
</script>
<template>

<body class="flex flex-col min-h-screen">
  <main class="flex-grow">
    <router-view />
  </main>
  <Footer date="02/06/2025"></Footer>
</body>

</template>

