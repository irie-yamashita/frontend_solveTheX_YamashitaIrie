<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue';
import Footer from './components/Footer.vue';
import LlistaToDos from './components/LlistaToDos.vue';
</script>

<template>
  <LlistaToDos></LlistaToDos>
  <Footer date="02/06/2025"></Footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
