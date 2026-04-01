import axios, { AxiosInstance } from "axios"

// Pointing to your local Node.js backend proxy
// This allows us to use Gemini without exposing the API key in the browser
const localBackendUrl = "http://localhost:3000"

const instance: AxiosInstance = axios.create({
    baseURL: localBackendUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // AI generation can take a few seconds, so we set a longer timeout
})

export default instance