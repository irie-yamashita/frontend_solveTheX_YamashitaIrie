

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Header from '../components/Header.vue';

    const error = ref(''); 
    const router = useRouter();
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
                const token = localStorage.getItem('token');
                const resposta = await fetch('http://localhost:3000/todos', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify(nouTODO.value)
                });

                router.push('/'); // tornar a la pàgina principal
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
    <Header></Header>
    <!-- v-model perquè la variable 'nouTodo' es vagi actualitzant-->
    <div class="min-h-screen flex flex-col pt-30 items-center bg-gray-100">

        <div class="flex flex-col justify-center bg-gray-100 w-200">
            <h2 class="text-2xl font-semibold text-center mb-4">Afegir TODO</h2>
            <input v-model="nouTODO.titol" type="text" placeholder="Títol" @blur="validaTitol" required class="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 mb-3"/>
            <textarea v-model="nouTODO.descripcio" placeholder="Descripció" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 mb-3"></textarea>
            <select v-model="nouTODO.prioritat" class="w-full px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded mb-3">
                <option value="alta">Alta</option>
                <option value="mitjana">Mitjana</option>
                <option value="baixa">Baixa</option>
            </select>
            <button @click="afegirTodo">Afegir</button>
            <p class="text-red-500 text-center mt-3">{{ error }}</p>
        </div>
    </div>
</template>