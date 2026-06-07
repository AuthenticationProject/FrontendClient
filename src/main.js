import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import {errorsHandler} from './scripts/errorsHandler.ts'
import { useTokenStore } from '@/stores/auth'
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.withCredentials = false

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.config.globalProperties.$handleError = (error) => {
    if(errorsHandler.handleError(error) === 401) {
        alert("Il token è scaduto. Per favore, effettua di nuovo il login.")
        const authStore = useTokenStore()
        authStore.setToken('')
        router.push('/')
    } else if(errorsHandler.handleError(error) === 403) {
        alert("Non hai i permessi necessari per accedere a questa risorsa.")
        router.push('/')
    } else if(errorsHandler.handleError(error) === 400) {
        alert("La richiesta è malformata. Per favore, controlla i dati inseriti.")
    } else if(errorsHandler.handleError(error) === 404) {
        alert("La risorsa richiesta non è stata trovata.")
        router.push('/')
    } else {
        alert("Si è verificato un errore. Per favore, riprova più tardi.")
    }
}

const servicePort = import.meta.env.VITE_SERVICE_PORT || '8080';
app.config.globalProperties.$servicePort = servicePort;
console.log("Service Port:", servicePort)