import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://686222dc96f0cc4e34b869f3.mockapi.io/api/v1/',
    timeout: 10000
})

export default defineNuxtPlugin(() => {
    return {
        provide: {
            httpClient
        }
    }
})

export { httpClient }