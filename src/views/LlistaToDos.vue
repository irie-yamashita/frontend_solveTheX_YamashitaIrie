<script setup>
import { ref, onMounted, computed  } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';

const todos = ref([]);
const router = useRouter();

const token = computed(() => localStorage.getItem('token'));
const prioritatSeleccionada = ref("");
const estatSeleccionat = ref("");

// Consumeixo API per obtenir tots els TODO's
const fetchTodos = async () => {
  try {
    let url = "http://localhost:3000/todos"; // Valor per defecte

    if (prioritatSeleccionada.value && prioritatSeleccionada.value !== "Tots") {
      url = `http://localhost:3000/todos/prioritat/${prioritatSeleccionada.value}`;
    }
    const resposta = await fetch(url);
    const dades = await resposta.json();
    todos.value = dades; 

    todos.value= dades.filter(todo => {
      if (estatSeleccionat.value === "true") return todo.completat;
      if (estatSeleccionat.value === "false") return !todo.completat;
      return true; // Mostrar tots
    });


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
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:3000/todos/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

    });
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
  <Header></Header>
  <div class="container mx-auto py-6 mt-10">
    <div class="flex items-center gap-4">
      <h1 class="text-left text-3xl font-bold mb-6">TODOs</h1>
      <span v-if="token" @click="anarAfegir" class="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors bg-gray-300 hover:bg-green-500 text-white mb-4">+</span>
    </div>
    <select @change="fetchTodos" v-model="prioritatSeleccionada" class="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200">
      <option value="">Tots</option>
      <option value="alta">Alta</option>
      <option value="mitjana">Mitjana</option>
      <option value="baixa">Baixa</option>
    </select>

    <select @change="fetchTodos" v-model="estatSeleccionat" class="px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200">
      <option value="">Tots</option>
      <option value="true">Completats</option>
      <option value="false">Pendents</option>
    </select>



    <div class="flex flex-wrap gap-6 mt-6">
      <div v-for="todo in todos" :key="todo.id" class="p-6 bg-gray-100 shadow-lg rounded-lg text-left transform transition-transform hover:scale-105">
      <p class="px-3 py-1 rounded text-gray-700 text-sm font-medium mb-5"
           :class="{
             'bg-yellow-200': todo.prioritat === 'baixa',
             'bg-orange-200': todo.prioritat === 'mitjana',
             'bg-red-200': todo.prioritat === 'alta'
           }">
          {{ todo.prioritat }}
        </p>
        <p><strong>{{ todo.titol }}</strong></p>
        <p>{{ todo.descripcio}}</p>

        <div class="flex justify-end items-center space-x-2">
          <label class="text-gray-700">{{ todo.completat ? 'Completat' : 'Pendent' }}</label>
          <input type="checkbox" :checked="todo.completat" disabled class="cursor-not-allowed">
        </div>
        <div v-if="token" class="flex justify-end space-x-4 mt-4">
          <span  v-if="token" @click="preguntarEliminar(todo.id)" class="px-3 py-2 rounded cursor-pointer transition-colors hover:bg-red-500 hover:text-white">Eliminar</span>
          <span  v-if="token" @click="anarModificar(todo.id)" class="px-3 py-2 rounded cursor-pointer transition-colors hover:bg-blue-500 hover:text-white">Modificar</span>
        </div>

      </div>
    </div>
  </div>
</template>
