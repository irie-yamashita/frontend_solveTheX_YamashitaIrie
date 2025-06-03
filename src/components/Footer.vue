<script setup lang="ts">

defineProps<{ date: string }>()

</script>

<template>
    <footer class="bg-gray-200 text-center py-4 mt-auto">Irie Yamashita - {{ date }}</footer>
</template>