<script setup>
import { useBebidasStore } from '@/stores/bebidas';

const bebidasStore = useBebidasStore();
defineProps({
  receta: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white border shadow-mg">
    <div class="overflow-hidden">
      <img
        class="hover:scale-110 transition-transform hover:rotate-2"
        :src="receta.strDrinkThumb"
        :alt="'Imagen de ' + receta.strDrink"
      />
    </div>

    <div class="p-3">
      <h2 class="truncate font-extrabold">{{ receta.strDrink }}</h2>
      <button 
        type="button"
        class="bg-orange-500 text-white py-2 w-full"
        @click="bebidasStore.selecionarBebida(receta.idDrink)"
        >
        Ver Receta
      </button>
    </div>
  </div>
</template>
