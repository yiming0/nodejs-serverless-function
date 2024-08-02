import { ref } from 'vue'

const template = `
<span class="text-lg" v-if="user">{{ user }}</span>
<div v-else class="flex gap-2">
    Authorize: 
    <button class="border rounded px-2" @click="authorize('get')">get</button>
    <button class="border rounded px-2" @click="authorize('create')">create</button>
</div>
`

async function authorize(method) {
    console.log('authorize')

    const publicKey = {
        challenge: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
        pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -8 },
            { type: "public-key", alg: -257 },
        ],
        rp: { id: "app.github.dev", name: "app.github.dev" },
        user: {
            name: 'pikaslime',
            displayName: 'PikaSlime',
            id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26])
        }
    }
    console.log('credentials', method)
    let credentials = await navigator.credentials[method]({ publicKey })

    console.log('credentials', credentials)
}

export default {
    setup() {
        const user = ref(null)

        return {
            user,
            authorize
        }
    },
    template
}