import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    userId?: string
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader?.split(" ")[1] || req.cookies?.token

        if (!token) {
            console.warn("No token provided in request to", req.path)
            return res.status(401).json({ message: "No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
        req.userId = decoded.userId
        next()
    } catch (error: any) {
        console.error("Token verification failed:", error.message)
        res.status(401).json({ message: "Invalid or expired token", error: error.message })
    }
}

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
        expiresIn: "7d",
    })
}
