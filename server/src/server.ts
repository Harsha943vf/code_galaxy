import express, { Response, Request } from "express"
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import axios from "axios"
import { SocketEvent, SocketId } from "./types/socket"
import { USER_CONNECTION_STATUS, User } from "./types/user"
import { Server } from "socket.io"
import path from "path"
import { GoogleGenerativeAI } from "@google/generative-ai" // Import Gemini SDK
import { connectDB } from "./config/database"
import authRoutes from "./routes/auth"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

// Connect MongoDB
connectDB()

// Auth routes
app.use("/api/auth", authRoutes)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
    },
    maxHttpBufferSize: 1e8,
    pingTimeout: 60000,
})

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

let userSocketMap: User[] = []

// ---------------- USERS ----------------

function getUsersInRoom(roomId: string): User[] {
    return userSocketMap.filter((user) => user.roomId == roomId)
}

function getRoomId(socketId: SocketId): string | null {
    const roomId = userSocketMap.find(
        (user) => user.socketId === socketId
    )?.roomId

    if (!roomId) {
        console.error("Room ID undefined for socket:", socketId)
        return null
    }

    return roomId
}

function getUserBySocketId(socketId: SocketId): User | null {
    const user = userSocketMap.find((user) => user.socketId === socketId)

    if (!user) {
        console.error("User not found for socket:", socketId)
        return null
    }

    return user
}

// ---------------- GEMINI AI EXECUTION (NEW) ----------------

app.post("/chat", async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" })
        }

        // Using gemini-1.5-flash for faster response times on M1
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" })

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        res.json({ reply: text })
    } catch (error: any) {
        console.error("Gemini Error:", error)
        res.status(500).json({ error: "AI generation failed" })
    }
})

// ---------------- ONECOMPILER CODE EXECUTION ----------------

app.post("/compile", async (req: Request, res: Response) => {
    try {
        const { language, stdin, files } = req.body

        const response = await axios.post(
            "https://api.onecompiler.com/v1/run",
            {
                language,
                stdin,
                files,
            },
            {
                headers: {
                    "X-API-Key": process.env.ONECOMPILER_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        )

        res.json(response.data)
    } catch (error: any) {
        console.error("OneCompiler Proxy Error:", error.response?.data || error.message)
        res.status(500).json({
            error: "Code execution failed",
            details: error.response?.data || error.message
        })
    }
})

// ---------------- SOCKET.IO ----------------

io.on("connection", (socket) => {
    socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
        const isUsernameExist = getUsersInRoom(roomId).filter(
            (u) => u.username === username
        )

        if (isUsernameExist.length > 0) {
            io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS)
            return
        }

        const user: User = {
            username,
            roomId,
            status: USER_CONNECTION_STATUS.ONLINE,
            cursorPosition: 0,
            typing: false,
            socketId: socket.id,
            currentFile: null,
        }

        userSocketMap.push(user)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user })
        const users = getUsersInRoom(roomId)
        io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users })
    })

    socket.on("disconnecting", () => {
        const user = getUserBySocketId(socket.id)
        if (!user) return
        const roomId = user.roomId
        socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user })
        userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id)
        socket.leave(roomId)
    })

    // FILE SYSTEM EVENTS
    socket.on(SocketEvent.SYNC_FILE_STRUCTURE, ({ fileStructure, openFiles, activeFile, socketId }) => {
        io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, { fileStructure, openFiles, activeFile })
    })

    socket.on(SocketEvent.FILE_UPDATED, ({ fileId, newContent }) => {
        const roomId = getRoomId(socket.id)
        if (!roomId) return
        socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, { fileId, newContent })
    })

    socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
        const roomId = getRoomId(socket.id)
        if (!roomId) return
        socket.broadcast.to(roomId).emit(SocketEvent.FILE_CREATED, { parentDirId, newFile })
    })

    socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
        const roomId = getRoomId(socket.id)
        if (!roomId) return
        socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, { fileId })
    })

    // CHAT
    socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
        const roomId = getRoomId(socket.id)
        if (!roomId) return
        socket.broadcast.to(roomId).emit(SocketEvent.RECEIVE_MESSAGE, { message })
    })

    // CURSOR / TYPING
    socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
        userSocketMap = userSocketMap.map((user) => {
            if (user.socketId === socket.id) {
                return { ...user, typing: true, cursorPosition }
            }
            return user
        })
        const user = getUserBySocketId(socket.id)
        if (!user) return
        socket.broadcast.to(user.roomId).emit(SocketEvent.TYPING_START, { user })
    })

    socket.on(SocketEvent.TYPING_PAUSE, () => {
        userSocketMap = userSocketMap.map((user) => {
            if (user.socketId === socket.id) {
                return { ...user, typing: false }
            }
            return user
        })
        const user = getUserBySocketId(socket.id)
        if (!user) return
        socket.broadcast.to(user.roomId).emit(SocketEvent.TYPING_PAUSE, { user })
    })
})

// ---------------- ROOT ----------------

const PORT = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
