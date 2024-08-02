import {createApp} from 'vue'
import comUserInfo from './userinfo.js'

async function registerServiceWorker(worker) {
    if ('serviceWorker' in navigator) {
        try {
            const workerRegistration = await navigator.serviceWorker.register(worker, { scope: './', })
        } catch (error) {
            console.error(`Registration failed with ${error}`)
        }
    } else {
        console.error(`ServiceWorker not supported`)
    }
}

export default function app({ worker }) {
    registerServiceWorker(worker)

    createApp(comUserInfo).mount('#user-info')
}