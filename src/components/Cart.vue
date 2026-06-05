<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <a class="navbar-brand ms-3" href="#">MyStore</a>
      <div class="container d-flex justify-content-end">

          <LogoutButton />

          <button class="btn btn-outline-light btn-sm ms-2" @click="$router.push('/profile')">
              Profilo
          </button>

          <button class="btn btn-outline-light btn-sm ms-2" @click="$router.push('/shop')">
              Negozio
          </button>
      </div>
  </nav>

  <div class="container my-5" style="max-width: 700px;">
    <h3 class="fw-bold mb-4">Carrello</h3>

    <div v-if="cartElements.length === 0" class="text-center py-4 text-muted border rounded bg-white">
      Il carrello è vuoto.
    </div>

    <div v-else class="card shadow-sm border-0 p-4 bg-white">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr class="text-muted small">
              <th>Prodotto</th>
              <th class="text-center">Q.tà</th>
              <th class="text-end">Prezzo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartElements">
              <td class="fw-medium text-dark">
                <button class="btn btn-sm btn-outline-secondary me-3" @click="removeItem(item.idItem, item.price)">
                  <i class="bi bi-x" style="color: red">X</i>
                </button>
                {{ item.name }}
              </td>
              <td class="text-center text-muted" style="width: 80px;">
                2x
              </td>
              <td class="text-end fw-bold text-dark">
                € {{ (item.price).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
        <span class="fs-5 text-muted">Totale:</span>
        <span class="fs-3 fw-bold text-success">€ {{ totale.toFixed(2) }}</span>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-dark px-4">Procedi al Pagamento</button>
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
import LogoutButton from './LogoutButton.vue'

export default {
    name: 'Cart page',
    components : {
        LogoutButton
    },
    data() {
      return {
        products: [],
        imageSrc: null,
        store: useTokenStore(),
        router: useRouter(),
        cart: useCartStore(),
        cartElements: []
      }
    },
    mounted() {
      this.cartElements = this.cart.getCart()
      console.log("Carrello attuale:", this.cartElements)
    },
    methods: {
        removeItem(id, price) {
            console.log("Rimuovi prodotto con ID:", id)
            this.cart.removeItem(id, price)
            this.cartElements = this.cart.getCart()
        }
    },
    computed: {
        totale() {
            return this.cartElements.reduce((acc, item) => acc + item.price, 0);
        }
    },
    beforeUnmount() {
        
    },
    watch: {
        
    }
}
</script>