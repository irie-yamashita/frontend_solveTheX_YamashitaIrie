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


//Funcions

const preguntarEliminar = (id) => {
    const eliminar = confirm("Estàs segur/a que vols eliminar el ToDo?");

    if(eliminar) {
        eliminarToDo(id);
    }
};

const eliminarToDo = async (id) => {
    try { 
        await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
        todos.value = todos.value.filter(todo => todo.id !== id); //Elimino de la llista el ToDo eliminat
        console.log("Eliminat!", id);
    } catch (error) {
        console.error('Error eliminant el TODO:', error);
    }

}
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
        <button @click="preguntarEliminar(todo.id)">Eliminar ToDo</button>
        <button @click="preguntarEliminar(todo.id)">Modificar ToDo</button>
      </div>
    </ul>
  </div>
</template>
