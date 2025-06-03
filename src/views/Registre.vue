
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Header from '../components/Header.vue';

    const error = ref(''); 
    const router = useRouter();

    // Defineixo l'objecte nou per guardar la info del nou user
    const nouUser = ref({
        username: '',
        password: ''
    });


    // Funció per registrar nous usuaris
    const registrar = async () => {
        if(nouUser.value.username == '' || nouUser.value.contrasenya == '') {
            error.value = 'Falta algun camp!';
        } else {
            try {
                const resposta = await fetch('http://localhost:3000/usuaris', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nouUser.value)
                });

                //router.push('/'); // tornar a la pàgina principal
            } catch (error) {
                console.error("Error en registrar l'usuari", error);
            }
        }
    
    };


</script>


<template>
<div>
    <input v-model="nouUser.username" type="text" placeholder="Username" required/>
    <textarea v-model="nouUser.password" placeholder="Password"></textarea>

    <button @click="registrar">Registrar-se</button>
    <p class="error">{{ error }}</p>
</div>
</template>