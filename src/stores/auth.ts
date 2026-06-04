import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
    

    state: () => (
        { 
            token: '',
            role: '',
        }
    ),
    getters: {
        getToken: (state) => state.token,
        getRole: (state) => state.role,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setRole(role: string) {
            this.role = role
        }
    },

})