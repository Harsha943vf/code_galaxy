import express, { Request, Response } from "express"
import User from "../models/User"
import { generateToken, verifyToken, AuthRequest } from "../middleware/auth"

const router = express.Router()

// Register
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password, confirmPassword } = req.body

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please provide all fields" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        })

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email ? "Email already exists" : "Username already exists",
            })
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
        })

        // Generate token
        const token = generateToken(user._id.toString())

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        })
    }
})

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" })
        }

        // Find user and include password field
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // Compare password
        const isPasswordMatch = await user.comparePassword(password)

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // Generate token
        const token = generateToken(user._id.toString())

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message,
        })
    }
})

// Get current user
router.get("/me", verifyToken, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        })
    }
})

export default router
