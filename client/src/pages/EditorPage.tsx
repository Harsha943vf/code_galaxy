import SplitterComponent from "@/components/SplitterComponent"
import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage"
import Sidebar from "@/components/sidebar/Sidebar"
import WorkSpace from "@/components/workspace"
import FormComponent from "@/components/forms/FormComponent"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useAuth } from "@/hooks/useAuth"
import useFullScreen from "@/hooks/useFullScreen"
import useUserActivity from "@/hooks/useUserActivity"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()
    // Enable fullscreen mode
    useFullScreen()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { status, currentUser } = useAppContext()
    const { socket } = useSocket()
    const { user: authUser } = useAuth()
    const [userJoined, setUserJoined] = useState(false)

    // Check if user is authenticated, if not redirect to login
    useEffect(() => {
        if (!authUser) {
            navigate("/login", {
                state: { redirectTo: `/editor/${roomId}` },
            })
        }
    }, [authUser, navigate, roomId])

    useEffect(() => {
        if (!roomId || !currentUser.username) {
            setUserJoined(false)
            return
        }
        
        setUserJoined(true)
        socket.emit(SocketEvent.JOIN_REQUEST, {
            username: currentUser.username,
            roomId: roomId,
        })
    }, [roomId, currentUser.username, socket])

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />
    }

    // If no room ID or user not yet joined, show the form to join a room
    if (!roomId || !userJoined) {
        return (
            <div className="flex w-full h-screen items-center justify-center bg-gradient-to-br from-[#0f1419] to-[#1a1f2e]">
                <FormComponent />
            </div>
        )
    }

    return (
        <SplitterComponent>
            <Sidebar />
            <WorkSpace/>
        </SplitterComponent>
    )
}

export default EditorPage

