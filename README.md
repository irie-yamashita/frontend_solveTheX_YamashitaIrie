# DOCUMENTACIÓN frontend_solveTheX_YamashitaIrie

Este proyecto es un frontend desarrollado en Vue + Vite para interactuar con la API de gestión de tareas (TODOs). Permite a los usuarios autenticarse, visualizar los TODOs y gestionarlos. Sólo aquellos que inicien sesión pueden gestionar las tareas como agregar, actualizar o eliminar. 

## Funcionalidades
+ Login y Registro con token JWT almacenado en localStorage.
+ Lista de TODOs con prioridad visualmente diferenciada.
+ Edición y eliminación de TODOs solo para usuarios autenticados.
+ Filtrar el listado por prioridad y según si la tarea está comletada o no.

## Instalación y configuración
1. Clonar el repositorio
2. Instalar dependencias `npm install`  
    ├── @tailwindcss/vite@4.1.8    
    ├── @vitejs/plugin-vue@5.2.4   
    ├── @vue/tsconfig@0.7.0    
    ├── tailwindcss@4.1.8  
    ├── typescript@5.8.3  
    ├── vite@6.3.5  
    ├── vue-router@4.5.1  
    ├── vue-tsc@2.2.10  
    └── vue@3.5.16  
3. Iniciar servidor API
4. Iniciar frontend `npm run dev`


## Tecnologías utilizadas
+ **Vue 3 + Vite** (estructura del frontend)
+ **Tailwind CSS** (diseño y estilos)
+ **Vue Router** (gestión de navegación)


## Estructura de carpetas
```
- node_modules                    // dependencias del proyecto
- public                          // archivos públicos accesibles directamente
- src
    - assets
    - components                  // componentes reutilizables
        - Footer.vue
        - Header.vue
    - views                       // vistas principales de la aplicación
        - AfegirToDo.vue
        - LlistaToDos.vue
        - LogIn.vue
        - ModificarToDo.vue
        - Registre.vue
    - App.vue                     // componente raíz de la aplicación
    - main.ts                     // punto de entrada de la aplicación
    - router.ts                   // configuración de rutas
    - style.css                   // estilos globales
    - vite-env.d.ts               
    - vue-shims.d.ts              
- .gitignore                      
- index.html                      // archivo HTML principal
- package-lock.json               
- package.json                    // configuración del proyecto y dependencias
- README.md                       
- tsconfig.app.json               
- tsconfig.json                   
- tsconfig.node.json             
- vite.config.ts 
```


# Autoría
Irie Yamashita