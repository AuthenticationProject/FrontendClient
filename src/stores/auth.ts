import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
    state: () => (
        { 
            token: '',
            role: '',
            username: '',
            email: '',
        }
    ),
    getters: {
        
    },
    actions: {
        getToken() {
            return localStorage.getItem('token')
        },
        getRole() {
            return localStorage.getItem('role')
        },
        getUsername() {
            return localStorage.getItem('username')
        },
        getEmail() {
            return localStorage.getItem('email')
        },
        setToken(token: string) {
            this.token = token
            localStorage.setItem('token', token)
        },
        setRole(role: string) {
            this.role = role
            localStorage.setItem('role', role)
        },
        setUsername(username: string) {
            this.username = username
            localStorage.setItem('username', username)
         },
        setEmail(email: string) {
            this.email = email
            localStorage.setItem('email', email)
        },
        clearToken() {
            this.token = ''
            this.role = ''
            this.username = ''
            this.email = ''
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
        }
    },

})