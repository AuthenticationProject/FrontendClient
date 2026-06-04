<template>
    <button class="btn btn-outline-light btn-sm ms-2" @click="logout()">
        Logout
    </button>
</template>
<script lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
    name: 'Logout button',
    components : {
        
    },
    data() {
      return {
        store: useTokenStore(),
        router: useRouter(),
        cart: useCartStore()
      }
    },
    mounted() {
        
    },
    methods: {
        logout() {
            this.store.clearToken()
            this.cart.clearCart()
            this.router.push('/')
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