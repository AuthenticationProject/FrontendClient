import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import {errorsHandler} from './scripts/errorsHandler.ts'
import { useTokenStore } from '@/stores/auth'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.config.globalProperties.$handleError = (error) => {
    if(errorsHandler.handleError(error) === 401) {
        // Il token è scaduto! Cancello Pinia e rimando l'utente al login
        alert("Il token è scaduto. Per favore, effettua di nuovo il login.")
        const authStore = useTokenStore()
        authStore.setToken('')
        router.push('/')
    } else if(errorsHandler.handleError(error) === 403) {
        alert("Non hai i permessi necessari per accedere a questa risorsa.")
        router.push('/')
    } else if(errorsHandler.handleError(error) === 400) {
        // La richiesta è malformata, mostro un messaggio di errore
        alert("La richiesta è malformata. Per favore, controlla i dati inseriti.")
    } else if(errorsHandler.handleError(error) === 404) {
        // La risorsa richiesta non è stata trovata
        alert("La risorsa richiesta non è stata trovata.")
        router.push('/')
    } else {
        // Errore generico del server
        alert("Si è verificato un errore. Per favore, riprova più tardi.")
    }
}