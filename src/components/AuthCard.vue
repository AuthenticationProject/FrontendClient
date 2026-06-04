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
import { useTokenStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
    name: 'Authentication page',
    data() {
      return {
        email:"",
        password:"",
        username:"",
        modalita:"login",
        store: useTokenStore(),
        cart: useCartStore(),
        router: useRouter()
      }
    },
    mounted() {
        
    },
    methods: {
        async inviaDati() {
            
            const payload = {
                email: this.email,
                password: this.password,
                username: this.username
            }
            console.log("Dati inviati:", payload)

            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    email: this.email,
                    password: this.password
                })
                console.log("Risposta ricevuta:", response.data)
                const jwt = response.data.token
                const role = response.data.role
                this.store.setToken(jwt)
                this.store.setRole(role)
                this.cart.username = this.email
                console.log("Token impostato:", this.store.getToken)
                if(role === "ADMIN") {
                    this.router.push('/dashboard')
                } else {
                    this.router.push('/shop')
                }
            } catch (error) {
                console.error("Login fallito:", error)
            }
        }
    },
    beforeUnmount() {
        
    },
    watch: {
        
    }
}
</script>