import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificacion";

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidasStore = useBebidasStore();
  const modalStore = useModalStore();
  const notificacionStore = useNotificacionStore();
  const favoritos = ref([]);

  function agregarFavorito() {
    favoritos.value.push(bebidasStore.receta);

    notificacionStore.handleNotificacion(
      "Receta agregada a favoritos",
      false
    );
  }

  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter((receta) => receta.idDrink !== bebidasStore.receta.idDrink);

    notificacionStore.handleNotificacion(
      "Receta eliminada de favoritos",
      false
    );
  }

  function guardarInLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }

  function obtenerFavoritosFromLocalStorage() {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritosLocalStorage) {
      favoritos.value = favoritosLocalStorage;
    }
  }

  function existeFavorito() {
    const favoritoLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritoLocalStorage.some((receta) => receta.idDrink === bebidasStore.receta.idDrink);
  }

  function handleClickFavorito() {
    if (existeFavorito()) {
      eliminarFavorito();
    } else {
      agregarFavorito();
    }
    modalStore.modal = false;
  }

  const noFavorite = computed(() => {
    return favoritos.value.length === 0;
  });

  watch(
    favoritos,
    () => {
      guardarInLocalStorage();
    },
    { deep: true }
  );

  onMounted(() => {
    obtenerFavoritosFromLocalStorage();
  });

  return {
    favoritos,
    handleClickFavorito,
    existeFavorito,
    noFavorite
  };
});
