// router.ts
import { createRouter, createWebHistory } from 'vue-router';
import LlistaToDos from './views/LlistaToDos.vue';
import AfegirToDo from './views/AfegirToDo.vue';
import ModificarToDo from './views/ModificarToDo.vue';
import Registre from './views/Registre.vue';
import LogIn from './views/LogIn.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LlistaToDos
  },
  {
    path: '/afegirToDo',
    name: 'AfegirToDo',
    component: AfegirToDo
  },
  {
    path: '/modificarToDo/:id',
    name: 'ModificarToDo',
    component: ModificarToDo
  },
  {
    path: '/registre',
    name: 'Registre',
    component: Registre
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
