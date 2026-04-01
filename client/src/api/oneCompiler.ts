import axios, { AxiosInstance } from "axios"

// Pointing to your local Node.js backend (server.ts) 
// instead of the external OneCompiler API
const localBackendUrl = "http://localhost:3000"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: localBackendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

export default axiosInstance