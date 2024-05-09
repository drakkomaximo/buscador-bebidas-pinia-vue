<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidasStore } from "@/stores/bebidas";
import { useNotificacionStore } from "@/stores/notificacion";

const route = useRoute();
const store = useBebidasStore();
const notificacion = useNotificacionStore();

const paginaInicio = computed(() => route.name === "inicio");

const handleSubmit = () =>{

  if (Object.values(store.busqueda).includes("")) {
    notificacion.handleNotificacion("Todos los campos son obligatorios", "error");
    return;
  }

  store.obtenerRecetas();
}
</script>

<template>
  <header class="bg-slate-800" :class="{ header: paginaInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img class="w-32" src="/img/logo.svg" alt="Logotipo /" />
          </RouterLink>
        </div>

        <nav class="flex gap-4">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="text-white font-bold uppercase"
            active-class="text-orange-500"
            >Inicio</RouterLink
          >
          <RouterLink
            :to="{ name: 'favoritos' }"
            class="text-white font-bold uppercase"
            active-class="text-orange-500"
            >Favoritos</RouterLink
          >
        </nav>
      </div>

      <form
        v-if="paginaInicio"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingredientes</label
          >
          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Nombre o Ingredientes: ej. Volka, Tequila, etc"
            v-model="store.busqueda.nombre"
          />
        </div>

        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoría</label
          >
          <select
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Selecciona una categoría --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>

        <input
          type="submit"
          class="bg-orange-500 text-white font-bold uppercase py-3 rounded-lg w-full cursor-pointer hover:bg-orange-700 transition duration-300 ease-in-out"
          value="Buscar Recetas"
        />
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
