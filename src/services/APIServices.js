import api from "@/libs/axios";


export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    },

    obtenerRecetas({nombre, categoria}) {
        return api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    },

    selecionarBebida(id) {
        return api.get(`/lookup.php?i=${id}`)
    }
};