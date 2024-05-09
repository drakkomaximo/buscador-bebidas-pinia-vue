<script setup>
import Receta from "@/components/Receta.vue";
import { useFavoritosStore } from "@/stores/favoritos";

const favoritosStore = useFavoritosStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10">
    <p 
      v-if="favoritosStore.noFavorite"
      class="text-2xl text-center col-span-3"
      >No hay Favoritos</p>
    <Receta
      v-else
      v-for="receta in favoritosStore.favoritos"
      :key="receta.idDrink"
      :receta="receta"
    />
  </div>
</template>
