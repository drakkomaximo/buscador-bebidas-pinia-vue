import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useNotificacionStore = defineStore('notificacion', ()=> {

    const texto = ref('');
    const error = ref(false);
    const mostrar = ref(false);

    const handleNotificacion = (mensaje, flag) => {
        texto.value = mensaje;
        error.value = flag;
        mostrar.value = true;
    }

    watch(mostrar, () => {
        if(mostrar.value){
            setTimeout(() => {
                texto.value = '';
                error.value = false;
                mostrar.value = false;
            }, 3000);
        }
    })

    return {
        texto,
        error,
        mostrar,
        handleNotificacion,
    }
})