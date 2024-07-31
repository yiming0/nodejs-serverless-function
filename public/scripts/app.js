export const registerServiceWorker = async (worker_script) => {
    if ('serviceWorker' in navigator) {
        try {
            const worker = await navigator.serviceWorker.register(worker_script, { scope: './', })
        } catch (error) {
            console.error(`Registration failed with ${error}`)
        }
    } else {
        console.error(`ServiceWorker not supported`)
    }
}
