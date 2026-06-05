<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <a class="navbar-brand ms-3" href="#">MyStore</a>
      <div class="container d-flex justify-content-end">

          <LogoutButton />

          <button class="btn btn-outline-light btn-sm ms-2" @click="$router.push('/shop')">
              Negozio
          </button>
      </div>
  </nav>

    <div class="container mt-4">
        <h1>Profilo utente</h1>
        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">Username: {{ store.getUsername() }}</h5>
                <p class="card-text">Email: {{ store.getEmail() }}</p>
                <p class="card-text">Ruolo: {{ store.getRole() }}</p>
            </div>
        </div>
    </div>

    <div class="container mt-5">
        <h2 class="mb-4">Cambia password</h2>
        <form @submit.prevent="cambiaPassword">
            <div class="mb-3">
                <label class="form-label fw-semibold">Password attuale</label>
                <input v-model="currentPassword" type="password" class="form-control" required placeholder="Inserisci la password attuale" />
            </div>
            <div class="mb-3">
                <label class="form-label
                fw-semibold">Nuova password</label>
                <input v-model="newPassword" type="password" class="form-control" required placeholder="Inserisci la nuova password" />
            </div>
            <button type="submit" class="btn btn-primary w-100 fw-bold py-2 text-uppercase">
                Cambia password
            </button>
        </form>
    </div>

</template>
<script lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import LogoutButton from './LogoutButton.vue'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/auth'

export default {
    name: 'Profile page',
    components : {
        LogoutButton
    },
    data() {
      return {
        store: useTokenStore(),
        router: useRouter(),
        currentPassword: "",
        newPassword: ""
      }
    },
    mounted() {
        const role = this.store.getRole()
        console.log("Ruolo utente:", role)
        if (role !== "USER") {
            this.router.push('/')
        }
    },
    methods: {
        cambiaPassword() {
            const payload = {
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
                email: this.store.getEmail()
            }

            axios.post('http://localhost:8080/api/user/changePassword', payload, {
                headers: {
                    'Authorization': `Bearer ${this.store.getToken()}`
                }
            })
            .then(response => {
                alert('Password cambiata con successo!')
                this.currentPassword = ""
                this.newPassword = ""
            })
            .catch(error => {
                console.error('Errore durante il cambio password:', error)
                alert('Si è verificato un errore. Assicurati di aver inserito correttamente la password attuale.')
            })
        }
    },
    computed: {

    },
    beforeUnmount() {
        
    },
    watch: {
        
    }
}
</script>