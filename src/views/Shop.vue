<template>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <a class="navbar-brand ms-3" href="#">MyStore</a>
        <div class="container d-flex justify-content-end">

            <LogoutButton />

            <button class="btn btn-outline-light btn-sm ms-2" @click="$router.push('/profile')">
                Profilo
            </button>

            <button class="btn btn-outline-light btn-sm ms-2" @click="$router.push('/cart')">
                Carrello
                <span class="badge rounded-pill bg-danger">{{ cartCount }}</span>
            </button>
        </div>
    </nav>

    <div class="container mb-5" style="max-width: 600px;">
        <h2 class="mb-4 text-center text-dark fw-bold">Il nostro catalogo</h2>
        
        <div class="row">
            <div v-for="product of products">
                <div class="col">
                    <div class="card shadow-sm border-0">
                        <img :src="product.imageUrl" class="card-img-top" alt="Immagine Prodotto">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">{{ product.name }}</h5>
                            <p class="card-text text-muted small flex-grow-1">
                                {{product.description}}
                            </p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fs-4 fw-bold text-success">€ {{ product.price }}</span>
                                <button class="btn btn-primary btn-sm px-3" @click="addToCart(product)">
                                    <i class="bi bi-cart-plus"></i> Aggiungi
                                </button>
                            </div>
                        </div>
                    </div>
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
import LogoutButton from '../components/LogoutButton.vue'

export default {
    name: 'Shop page',
    components : {
        LogoutButton
    },
    data() {
      return {
        products: [],
        imageSrc: null,
        store: useTokenStore(),
        cart: useCartStore(),
        router: useRouter(),
        cartCount: 0,
        port: this.$servicePort
      }
    },
    mounted() {
        this.cartCount = this.cart.getCart().length

        const role = this.store.getRole()
        console.log("Ruolo utente:", role)
        if (role !== "USER") {
            this.router.push('/')
        } else {
            const token = this.store.getToken()
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios.get(`http://localhost:${this.port}/api/user/getProducts`, config)
            .then(response => {
                console.log("Prodotti ricevuti:", response.data)
                
                if (response.data.length > 0) {
                    response.data.forEach(async (product) => {
                        console.log("Elaborazione prodotto:", product)
                        const image = await this.getImage(product.urlImage, {
                                    headers: { Authorization: `Bearer ${token}` },
                                    responseType: "blob"
                                })
                        this.products.push({
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                imageUrl: image
                            })                        
                    })
                }
                                
            })
            .catch(error => {
                console.log(error.response.status)
                this.$handleError(error)
            })
        }
    },
    methods: {
        async getImage(url, config) {
            console.log("Richiesta immagine:", url)
            const response = await axios.get(`http://localhost:${this.port}/api/user/getImage/${url}`, config);
            if (response.status == 200) {
                const base64data = await this.blobToData(response.data);
                return base64data;
            } else {
                console.error('Errore nel caricamento dell\'immagine', response.status)
            }
        },
        blobToData(blob) {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(blob)
            })
        },
        addToCart(product) {
            console.log("Aggiunto al carrello:", product)
            this.cart.addItem(product.id, product.name, product.price)
            this.cartCount = this.cart.getCart().length
        }
    }
}
</script>
<style>
.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>