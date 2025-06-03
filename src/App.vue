<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
<template>
  <Header></Header>
  <main>
    <router-view />
  </main>
  <Footer date="02/06/2025"></Footer>
</template>

