
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


    // Funció per iniciar sessió
    const login = async () => {
        if(nouUser.value.username == '' || nouUser.value.password == '') {
            error.value = 'Falta algun camp!';
            return; 
        } else {
            try {
                const resposta = await fetch('http://localhost:3000/usuaris/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nouUser.value)
                });

                const data = await resposta.json();

                if (!resposta.ok) {
                    error.value = data.error
                    return;
                }
                error.value = '';

                console.log("Token: ", data.token);

                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.user.username);
                router.push('/'); // tornar a la pàgina principal
            } catch (error) {
                console.error("Error en registrar l'usuari", error);
            }
        }
    
    };


</script>


<template>

<div>
    <Header></Header>
    <input v-model="nouUser.username" type="text" placeholder="Username" required/>
    <textarea v-model="nouUser.password" placeholder="Password"></textarea>

    <button @click="login">Inicia sessió</button>
    <p class="error">{{ error }}</p>
</div>
</template>