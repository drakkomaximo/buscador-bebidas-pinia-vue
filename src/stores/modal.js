import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFavoritosStore } from "@/stores/favoritos";


export const useModalStore = defineStore('modal', ()=>{
    
    const favoritosStore = useFavoritosStore()
    const modal = ref(false)

    function handleClickModal(){
        modal.value = !modal.value
    }

    const textButton = computed(()=>{
        return favoritosStore.existeFavorito() ? 'Eliminar de favoritos' : 'Agregar a favoritos'
    })
    
    return {
        modal,
        textButton,
        handleClickModal
    }
})