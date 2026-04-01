import React, { createContext, useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { Socket } from "socket.io-client"

interface User {
    id: string
    username: string
    email: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>
    logout: (socket?: Socket) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check if token exists in localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem("cgc_auth_token")
        if (savedToken) {
            setToken(savedToken)
            // Set default axios header
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`
            // Fetch current user
            fetchCurrentUser(savedToken)
        } else {
            setIsLoading(false)
        }
    }, [])

    const fetchCurrentUser = async (authToken: string) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/api/auth/me`,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            )
            setUser(response.data.user)
        } catch (error) {
            localStorage.removeItem("cgc_auth_token")
            setToken(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/api/auth/login`,
                { email, password }
            )

            const { token: authToken, user: userData } = response.data

            localStorage.setItem("cgc_auth_token", authToken)
            setToken(authToken)
            setUser(userData)
            axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>
            throw new Error(axiosError.response?.data?.message || "Login failed")
        }
    }

    const register = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/api/auth/register`,
                { username, email, password, confirmPassword }
            )

            const { token: authToken, user: userData } = response.data

            localStorage.setItem("cgc_auth_token", authToken)
            setToken(authToken)
            setUser(userData)
            axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>
            throw new Error(axiosError.response?.data?.message || "Registration failed")
        }
    }

    const logout = (socket?: Socket) => {
        // Disconnect from Socket.io if provided
        if (socket && socket.connected) {
            socket.disconnect()
        }
        
        // Clear auth data
        localStorage.removeItem("cgc_auth_token")
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common["Authorization"]
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!token,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
