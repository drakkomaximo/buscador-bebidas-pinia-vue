<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "@/stores/modal";
import { useBebidasStore } from "@/stores/bebidas";
import { useFavoritosStore } from "@/stores/favoritos";

const modalStore = useModalStore();
const bebidasStore = useBebidasStore();
const favoritosStore = useFavoritosStore();

const formatearIngredientes = (receta) => {
  const ingredientesDiv = document.createElement("DIV");

  for (let i = 1; i <= 15; i++) {
    if (receta[`strIngredient${i}`]) {
      const ingrediente = receta[`strIngredient${i}`];
      const medida = receta[`strMeasure${i}`] || "Freestyle";

      const ingredienteCantidad = document.createElement("P");
      ingredienteCantidad.classList.add("text-sm", "text-gray-700");
      ingredienteCantidad.textContent = `${ingrediente} - ${medida}`;

      ingredientesDiv.appendChild(ingredienteCantidad);
    }
  }

  return ingredientesDiv;
};

</script>

<template>
  <TransitionRoot as="template" :show="modalStore.modal">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modalStore.handleClickModal()"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-1">
                  <DialogTitle
                    as="h3"
                    class="text-3xl font-extrabold text-center text-gray-900 mb-2"
                  >
                    {{ bebidasStore.receta.strDrink }}
                  </DialogTitle>

                  <img
                    :src="bebidasStore.receta.strDrinkThumb"
                    :alt="'Imagen de ' + bebidasStore.receta.strDrink"
                    class="mx-auto w-64"
                  />

                  <DialogTitle
                    as="h4"
                    class="text-2xl font-bold text-gray-900"
                  >
                    Ingredientes y cantidades
                  </DialogTitle>

                  <div
                    v-html="
                      formatearIngredientes(bebidasStore.receta).outerHTML
                    "
                  ></div>

                  <DialogTitle
                    as="h4"
                    class="text-2xl font-bold text-gray-900"
                  >
                    Instrucciones
                  </DialogTitle>

                  <p class="mt-1 text-sm text-gray-700">
                    {{ bebidasStore.receta.strInstructions }}
                  </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  class="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  @click="modalStore.handleClickModal()"
                >
                  Cerrar
                </button>

                <button
                  class="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                  @click="favoritosStore.handleClickFavorito"
                  
                >
                  {{ modalStore.textButton }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
