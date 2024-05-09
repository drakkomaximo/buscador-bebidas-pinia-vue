<script setup>
import { useBebidasStore } from "@/stores/bebidas";
import Receta from "@/components/Receta.vue";

const bebidasStore = useBebidasStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10">
    <p 
      v-if="bebidasStore.noRecetas"
      class="text-2xl text-center col-span-3"
      >No hay Recetas, usa el formulario para encontrar resultados</p>
    <Receta
    v-else
      v-for="receta in bebidasStore.recetas"
      :key="receta.idDrink"
      :receta="receta"
    />
  </div>
</template>
