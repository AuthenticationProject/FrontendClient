import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => (
        { 
            username: '',
        }
    ),
    getters: {
        getUsername: (state) => state.username,
    },
    actions: {
        addItem(idItem: number, name: string, price: number) {
            const cartFromStorage = this.getCart();
            cartFromStorage.push({ idItem, name, price })
            localStorage.setItem(this.username, JSON.stringify(cartFromStorage));
        },
        getCart() {
            const cartFromStorage = localStorage.getItem(this.username);
            return cartFromStorage ? JSON.parse(cartFromStorage) : [];
        },
        removeItem(idItem: number, price: number) {
            const cartFromStorage = this.getCart();
            let idx = cartFromStorage.findIndex((p: { idItem: number, price: number }) => p.idItem === idItem && p.price === price);
            if(idx >= 0){
                var removed = cartFromStorage.splice(idx, 1);     
                console.log(removed);
                console.log(cartFromStorage);
            }
            localStorage.setItem(this.username, JSON.stringify(cartFromStorage));
        },
        clearCart() {
            this.username = ''
            localStorage.removeItem(this.username);
        }
    },

})