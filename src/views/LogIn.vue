
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
                    const data = await resposta.json();
                    error.value = data.error || 'Error desconegut';
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
    <Header></Header>
    <div class="min-h-screen flex flex-col pt-30 items-center bg-gray-50">
        <div>
            <h2 class="text-2xl font-semibold text-center mb-4">Iniciar Sessió</h2>
            <input v-model="nouUser.username" type="text" placeholder="Username" required class="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 mb-3"/>
            <input type="password" v-model="nouUser.password" placeholder="Password" class="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 mb-3"></input>

            <button @click="login" >Inicia sessió</button>
            <p class="text-red-500 text-center mt-4">{{ error }}</p>
        </div>
    </div>

</template>