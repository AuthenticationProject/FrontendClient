<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    
    <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px;">
      <h2 class="text-center h4 mb-4 text-uppercase fw-bold">{{ modalita }}</h2>

      <form @submit.prevent="inviaDati">
        
        <div v-if="modalita === 'registrazione'" class="mb-3">
          <label class="form-label fw-semibold">Username</label>
          <input v-model="username" type="text" class="form-control" required placeholder="Inserisci username" />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input v-model="email" type="email" class="form-control" required placeholder="nome@esempio.com" />
        </div>

        <div v-if="modalita !== 'reset'" class="mb-4">
          <label class="form-label fw-semibold">Password</label>
          <input v-model="password" type="password" class="form-control" required placeholder="••••••••" />
        </div>

        <button type="submit" class="btn btn-success w-100 fw-bold py-2 text-uppercase">
          Invia
        </button>
      </form>

      <Loading v-if="loading" />

      <div class="mt-4 pt-2 border-top">
        <div class="d-flex justify-content-between gap-1">
          <button @click="modalita = 'login'" class="btn btn-outline-secondary btn-sm flex-grow-1" :class="{ active: modalita === 'login' }">Accedi</button>
          <button @click="modalita = 'registrazione'" class="btn btn-outline-secondary btn-sm flex-grow-1" :class="{ active: modalita === 'registrazione' }">Registrati</button>
          <button @click="modalita = 'reset'" class="btn btn-outline-secondary btn-sm flex-grow-1" :class="{ active: modalita === 'reset' }">Reset</button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Loading from './Loading.vue'
import { useTokenStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
    name: 'Authentication page',
    components : {
        Loading
    },
    data() {
      return {
        email:"",
        password:"",
        username:"",
        modalita:"login",
        store: useTokenStore(),
        cart: useCartStore(),
        router: useRouter(),
        loading: false,
        port: this.$servicePort
      }
    },
    mounted() {
        
    },
    methods: {
        async inviaDati() {
            this.loading = true
            if(this.modalita === 'login') {
                await this.login()
            } else if(this.modalita === 'registrazione') {
                await this.register()
            } else if(this.modalita === 'reset') {
                await this.resetPassword()
            }
            this.loading = false
        },
        async login() {
            const payload = {
                email: this.email,
                password: this.password,
                username: this.username
            }
            console.log("Dati inviati:", payload)

            try {
                const response = await axios.post(`http://localhost:${this.port}/api/auth/login`, {
                    email: this.email,
                    password: this.password
                })
                console.log("Risposta ricevuta:", response.data)
                const jwt = response.data.token
                const role = response.data.role
                this.store.setToken(jwt)
                this.store.setRole(role)
                this.store.setUsername(this.username)
                this.store.setEmail(this.email)
                this.cart.setUsername(this.email)
                console.log("Token impostato:", this.store.getToken)
                if(response.data.hasTemporaryPassword) {
                    alert('Attenzione: stai utilizzando una password temporanea. Ti consigliamo di cambiarla al più presto!')
                }
                if(role === "ADMIN") {
                    this.router.push('/dashboard')
                } else {
                    this.router.push('/shop')
                }
            } catch (error) {
                console.error("Login fallito:", error)
            }
        },
        async register() {
            try {
                const response = await axios.post(`http://localhost:${this.port}/api/auth/register`, {
                    email: this.email,
                    password: this.password,
                    username: this.username
                })
                console.log("Risposta ricevuta:", response.data)
                alert('Registrazione avvenuta con successo! Ora puoi effettuare il login.')
                this.modalita = 'login'
            } catch (error) {
                console.error("Registrazione fallita:", error)
            }
        },
        async resetPassword() {
            try {
                const response = await axios.post(`http://localhost:${this.port}/api/auth/setTemporaryPassword`, {
                    email: this.email
                })
                console.log("Risposta ricevuta:", response.data)
                alert('Se l\'email è registrata, riceverai un messaggio con le istruzioni per reimpostare la password.')
                this.modalita = 'login'
            } catch (error) {
                console.error("Reset password fallito:", error)
            }
        }
    },
    beforeUnmount() {
        
    },
    watch: {
        
    }
}
</script>