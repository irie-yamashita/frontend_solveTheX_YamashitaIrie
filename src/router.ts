// router.ts
import { createRouter, createWebHistory } from 'vue-router';
import LlistaToDos from './components/LlistaToDos.vue';
import AfegirToDo from './components/AfegirToDo.vue';
import ModificarToDo from './components/ModificarToDo.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
