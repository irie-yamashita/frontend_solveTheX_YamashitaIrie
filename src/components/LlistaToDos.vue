<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const todos = ref([]);
const router = useRouter();

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
fetchTodos();

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

const anarModificar = (id) => {
  router.push({ name: 'ModificarToDo', params: { id } });
}

const anarAfegir = () => {
  router.push('AfegirToDo');
}
</script>

<template>
  <div>
    <h1>TODO List</h1>
    <button @click="anarAfegir">Afegir TODO</button>

    <ul>
      <div v-for="todo in todos" :key="todo.id">
        <p><strong>{{ todo.titol }}</strong></p>
        <p>{{ todo.descripcio}}</p>
        <p>{{ todo.prioritat}}</p>
        <p v-if="todo.completat == 0">Pendent</p>
        <p v-else>Completat</p>
        <p>{{ todo.data_creacio }}</p>
        <button @click="preguntarEliminar(todo.id)">Eliminar ToDo</button>
        <button @click="anarModificar(todo.id)">Modificar ToDo</button>
      </div>
    </ul>
  </div>
</template>
