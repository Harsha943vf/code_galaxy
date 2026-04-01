import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useAuth } from "@/hooks/useAuth"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const { user: authUser } = useAuth()

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()
    const initializedRef = useRef(false)

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        toast.success("Created a new Room Id")
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room id")
            return false
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    // Initialize room ID from location state and auto-fill username from auth user
    useEffect(() => {
        // Only initialize once on component mount
        if (!initializedRef.current) {
            initializedRef.current = true
            
            if (location.state?.roomId && currentUser.roomId.length === 0) {
                const newUser = {
                    username: authUser?.username || currentUser.username,
                    roomId: location.state.roomId,
                }
                setCurrentUser(newUser)
                if (!authUser?.username && currentUser.username.length === 0) {
                    toast.success("Enter your username")
                }
            }
        }
    }, [location.state?.roomId, authUser?.username, currentUser.roomId.length, currentUser.username, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-6 p-6 sm:w-[500px] sm:p-8 bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-2xl border border-cyan-500/20 shadow-2xl">
            {/* CodeGalaxy Logo */}
            <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✨</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CodeGalaxy</h1>
            </div>
            
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">Join a Room</h2>
                <p className="text-gray-400 text-sm">Enter your details to start coding together</p>
            </div>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-300">Room ID</label>
                    <input
                        type="text"
                        name="roomId"
                        placeholder="e.g., abc-123-def"
                        className="w-full rounded-lg border border-gray-600 bg-[#1a1f2e] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        onChange={handleInputChanges}
                        value={currentUser.roomId}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-300">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Your name (min 3 chars)"
                        className="w-full rounded-lg border border-gray-600 bg-[#1a1f2e] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        onChange={handleInputChanges}
                        value={currentUser.username}
                        ref={usernameRef}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === USER_STATUS.ATTEMPTING_JOIN}
                >
                    {status === USER_STATUS.ATTEMPTING_JOIN ? "Joining..." : "Join Room"}
                </button>
            </form>
            <button
                className="text-cyan-400 hover:text-cyan-300 underline text-sm font-medium transition-colors"
                onClick={createNewRoomId}
            >
                ✨ Generate Unique Room ID
            </button>
        </div>
    )
}

export default FormComponent
