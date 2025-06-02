

<script setup>
    import { ref } from 'vue';

    const error = ref(''); 
    // Defineixo l'objecte nou per guardar la info del nou TODO
    const nouTODO = ref({
        titol: '',
        descripcio: '',
        prioritat: 'baixa'
    });


    // Funció per enviar el nou TODO a l'API
    const afegirTodo = async () => {
        if(nouTODO.value.titol == '') {
            error.value = 'El títol és un camp obligatori!';
        } else {
            try {
                const resposta = await fetch('http://localhost:3000/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nouTODO.value)
                });
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
    <h2>Afegir nou TODO</h2>
    <input v-model="nouTODO.titol" type="text" placeholder="Títol" @blur="validaTitol" required/>
    <textarea v-model="nouTODO.descripcio" placeholder="Descripció"></textarea>
    <select v-model="nouTODO.prioritat">
      <option value="alta">Alta</option>
      <option value="mitjana">Mitjana</option>
      <option value="baixa">Baixa</option>
    </select>
    <button @click="afegirTodo">Afegir</button>
    <p class="error">{{ error }}</p>
  </div>
</template>