import { ref, reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import APIServices from "@/services/APIServices";
import { useModalStore } from "./modal";

export const useBebidasStore = defineStore("bebidas", () => {
  const modalStore = useModalStore();
  const categorias = ref([]);
  const recetas = ref([]);
  const receta = ref({});
  const busqueda = reactive({
    nombre: "",
    categoria: "",
  });

  const obtenerCategorias = async () => {
    const {
      data: { drinks },
    } = await APIServices.obtenerCategorias();
    categorias.value = drinks;
  };

  onMounted(async () => {
    await obtenerCategorias();
  });

  async function obtenerRecetas() {
    const {
      data: { drinks },
    } = await APIServices.obtenerRecetas(busqueda);
    recetas.value = drinks;
  }

  async function selecionarBebida(id) {
    const {
      data: { drinks },
    } = await APIServices.selecionarBebida(id);
    receta.value = drinks[0];
    modalStore.handleClickModal();
  }

  const noRecetas = computed(() => {
    return recetas.value.length === 0;
  });

  return {
    categorias,
    recetas,
    receta,
    busqueda,
    obtenerCategorias,
    obtenerRecetas,
    selecionarBebida,
    noRecetas,
  };
});
