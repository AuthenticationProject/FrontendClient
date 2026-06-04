<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

</script>

<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px;">
            <input class="mb-3" type="file" @change="gestisciCambioFile" accept="image/*" />
            <button class="btn btn-primary" @click="inviaFoto" :disabled="!fileSelezionato">Carica Foto</button>
        </div>
    </div>
</template>

<script lang="ts">
const fileSelezionato = ref<File | null>(null)
export default {
    name: 'LoadImage',
    data() {
      return {
        fileSelezionato: ref<File | null>(null)
      }
    },
    methods: {
        // Cattura il file quando l'utente lo sceglie dal computer
            gestisciCambioFile(event: Event) {
                const target = event.target as HTMLInputElement
                if (target.files && target.files.length > 0) {
                    console.log("File selezionato:", target.files[0])
                    fileSelezionato.value = target.files[0]
                    this.$emit("image-loaded", target.files[0])
                }
            },

            async inviaFoto() {
                if (!fileSelezionato.value) return

                // Crea il contenitore Multipart
                const formData = new FormData()
                formData.append('file', fileSelezionato.value)

                try {
                    await axios.post('http://localhost:8080/api/auth/caricafoto', formData)
                    alert('Foto salvata nel DB!')
                } catch (error) {
                    console.error('Errore nel caricamento', error)
                }
            }
    }
}
</script>