<script setup>
import { ref, onMounted } from 'vue';

const todos = ref([]);

// Consumeixo API per obtenir tots els TODO's
const fetchTodos = async () => {
  try {
    const resposta = await fetch('http://localhost:3000/todos');
    const dades = await resposta.json();
    todos.value = dades; 

  } catch (error) {
    console.error('Error carregant les TODOs:', error);
  }
};


// Executa `fetchTodos()` només quan el component es munta
onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div>
    <h1>TODO List</h1>
    <ul>
      <div v-for="todo in todos" :key="todo.id">
        <p><strong>{{ todo.titol }}</strong></p>
        <p>{{ todo.descripcio}}</p>
        <p>{{ todo.prioritat}}</p>
        <p v-if="todo.completat == 0">Completat</p>
        <p v-else>Pendent</p>
        <p>{{ todo.data_creacio}}</p>
      </div>
    </ul>
  </div>
</template>
