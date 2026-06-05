import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => (
        {
        }
    ),
    getters: {
        
    },
    actions: {
        getUsername(): string {
            console.log("Username cart:", localStorage.getItem("username_cart"))
            return localStorage.getItem("username_cart") || '';
        },
        addItem(idItem: number, name: string, price: number) {
            const cartFromStorage = this.getCart();
            cartFromStorage.push({ idItem, name, price })
            localStorage.setItem(this.getUsername(), JSON.stringify(cartFromStorage));
        },
        setUsername(username: string) {
            localStorage.setItem("username_cart", username);
        },
        getCart() {
            const cartFromStorage = localStorage.getItem(this.getUsername());
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
            localStorage.setItem(this.getUsername(), JSON.stringify(cartFromStorage));
        },
        clearCart() {
            this.setUsername('')
            //localStorage.removeItem(this.getUsername());
        }
    },

})