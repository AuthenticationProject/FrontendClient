<template>

    <h2 class="mb-4 text-center text-dark fw-bold">Aggiungi un nuovo prodotto</h2>
    <div class="card p-4 shadow-sm mx-auto mb-3" style="width: 100%; max-width: 400px;">
        <form @submit.prevent="inviaDati">
            
            <div class="mb-3">
                <label class="form-label fw-semibold">Nome prodotto</label>
                <input v-model="titleProduct" class="form-control" required/>
            </div>

            <div class="mb-4">
                <label class="form-label fw-semibold">Descrizione</label>
                <input v-model="descriptionProduct" class="form-control" required/>
            </div>

            <div class="mb-4">
                <label class="form-label fw-semibold">Prezzo</label>
                <input v-model="priceProduct" class="form-control" required/>
            </div>

            <label class="form-label fw-semibold">Foto caricata: {{ imageName }}</label>

            <button type="submit" class="btn btn-success w-100 fw-bold py-2 text-uppercase">
                Invia
            </button>

        </form>
    </div>

    <div class="container d-flex justify-content-center align-items-center">
        <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px;">
            <input class="mb-3" type="file" @change="gestisciCambioFile" accept="image/*" />
        </div>
    </div>
    

</template>

<script lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/auth'
import LoadImage from '../components/LoadImage.vue'

const fileSelezionato = ref<File | null>(null)

export default {
    name: 'Dashboard page',
    components : {
        LoadImage
    },
    data() {
      return {
        store: useTokenStore(),
        router: useRouter(),
        titleProduct: "",
        descriptionProduct: "",
        priceProduct: 0,
        imageName: ""
      }
    },
    mounted() {
        const role = this.store.getRole
        if (role !== "ADMIN") {
            this.router.push('/')
        }
    },
    methods: {
        gestisciCambioFile(event: Event) {
            const target = event.target as HTMLInputElement
            if (target.files && target.files.length > 0) {
                console.log("File selezionato:", target.files[0])
                fileSelezionato.value = target.files[0]
                this.imageName = target.files[0].name
            }
        },

        async inviaFoto() {
            if (!fileSelezionato.value) return

            // Crea il contenitore Multipart
            const formData = new FormData()
            formData.append('file', fileSelezionato.value)

            const token = this.store.getToken
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            try {
                await axios.post('http://localhost:8080/api/admin/loadImage', formData, config)
                alert('Foto salvata nel DB!')
            } catch (error) {
                console.error('Errore nel caricamento', error)
            }
        },

        async inviaDati() {
            this.inviaFoto() // Prima carichiamo la foto, così abbiamo l'URL da associare al prodotto
            
            const token = this.store.getToken
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const payload = {
                name: this.titleProduct,
                description: this.descriptionProduct,
                price: this.priceProduct,
                urlImage: this.imageName // Assumiamo che il nome del file sia sufficiente per identificare l'immagine nel DB
            }
            console.log("Dati da inviare:", payload)

            try {
                const response = await axios.post('http://localhost:8080/api/admin/addProduct', payload, config)
                console.log("Risposta ricevuta:", response.data)
            } catch (error) {
                console.error("Richiesta fallita:", error)
            }
            
        }
    },
    beforeUnmount() {
        
    },
    watch: {
        
    }
}
</script>