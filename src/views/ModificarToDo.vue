

<script setup>
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Header from '../components/Header.vue';


    const route = useRoute();
    const router = useRouter();
    const error = ref(''); 
    const id = Number(route.params.id);

    const nouTODO = ref({
        titol: '',
        descripcio: '',
        completat: 0,
        prioritat: 'baixa'
    });

    // Carrego l'objecte amb les dades del TODO
    const cargarTodo = async () => {
        try {
            const resposta = await fetch(`http://localhost:3000/todos/${id}`);
            const dades = await resposta.json();;

            nouTODO.value.titol = dades.titol;
            nouTODO.value.descripcio = dades.descripcio;
            nouTODO.value.completat = dades.completat;
            nouTODO.value.prioritat = dades.prioritat;
            
        } catch (error) {
            console.error("Error a l'obtenir dades del TODO:", error);
        }
    };
    cargarTodo();


    // Funció per enviar el nou TODO a l'API
    const modificarTodo = async () => {
        
        if(nouTODO.value.titol == '') {
            error.value = 'El títol és un camp obligatori!';
        } else {
            try {
                const token = localStorage.getItem('token');
                const resposta = await fetch(`http://localhost:3000/todos/${id}`, {
                    method: 'PUT',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nouTODO.value)
                });

                console.log("TODO modificat!");

                //Redirigeixo a la pàgina principal
                router.push('/');
            } catch (error) {
                console.error('Error al afegir el TODO:', error);
            }
        }
    
    };

    //Funció per validar si usuari ha introduit el camp 'titol' (on blur)
    const validaTitol = () => {
        if(nouTODO.value.titol == '') {
            error.value = 'El títol és un camp obligatori!';
        } else {
            error.value = '';
        }
    }

</script>


<template>
    <!-- v-model perquè la variable 'nouTodo' es vagi actualitzant-->
  <div>
    <h2>Modificar TODO</h2>
    <input v-model="nouTODO.titol" type="text" placeholder="Títol" @blur="validaTitol" required/>
    <textarea v-model="nouTODO.descripcio" placeholder="Descripció"></textarea>
    <select v-model="nouTODO.prioritat">
      <option value="alta">Alta</option>
      <option value="mitjana">Mitjana</option>
      <option value="baixa">Baixa</option>
    </select>
    
    <label> Completat</label>
    <input v-model="nouTODO.completat" :true-value="1"
  :false-value="0" type="checkbox">
    <button @click="modificarTodo">Modificar</button>
    <p class="error">{{ error }}</p>
  </div>
</template>