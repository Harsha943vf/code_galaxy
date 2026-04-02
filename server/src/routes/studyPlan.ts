import { Router, Request, Response } from "express"
import StudyPlan from "../models/StudyPlan"
import {
    generateStudyPlan,
    generateQuizzes,
    explainTopic,
    generateResourceRecommendations,
} from "../services/studyPlanService"
import { verifyToken, AuthRequest } from "../middleware/auth"

const router = Router()

// Apply auth middleware to all routes
router.use(verifyToken)

// Generate a new study plan
router.post("/generate", async (req: Request, res: Response) => {
    try {
        console.log("POST /generate called")
        const { subject, goal, level, totalHours, duration } = req.body
        const userId = (req as any).userId

        console.log("Request body:", { subject, goal, level, totalHours, duration })
        console.log("User ID:", userId)

        // Validate input
        if (!subject || !goal || !totalHours || !duration) {
            console.warn("Missing required fields:", { subject, goal, totalHours, duration })
            return res.status(400).json({ error: "Missing required fields" })
        }

        // Generate plan using AI
        console.log("Generating study plan...")
        const generatedPlan = await generateStudyPlan({
            subject,
            goal,
            level: level || "beginner",
            totalHours,
            duration,
        })

        console.log("Study plan generated successfully with", generatedPlan.topics?.length, "topics")

        // Create study plan in database
        const studyPlan = new StudyPlan({
            userId,
            subject,
            goal,
            level: level || "beginner",
            totalHours,
            duration,
            topics: generatedPlan.topics,
            progress: 0,
            status: "active",
        })

        await studyPlan.save()
        console.log("Study plan saved to database with ID:", studyPlan._id)

        res.status(201).json({
            success: true,
            plan: studyPlan,
        })
    } catch (error) {
        console.error("Error generating study plan:", error)
        const errorMessage = (error as any)?.message || "Failed to generate study plan"
        const stack = (error as any)?.stack
        console.error("Error stack:", stack)
        res.status(500).json({
            error: "Failed to generate study plan",
            details: errorMessage,
        })
    }
})

// Get all study plans for user
router.get("/", async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId
        const plans = await StudyPlan.find({ userId }).sort({ createdAt: -1 })

        res.json({
            success: true,
            plans,
        })
    } catch (error) {
        console.error("Error fetching plans:", error)
        res.status(500).json({ error: "Failed to fetch plans" })
    }
})

// Get single study plan
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = (req as any).userId

        const plan = await StudyPlan.findById(id)

        if (!plan) {
            return res.status(404).json({ error: "Study plan not found" })
        }

        if (plan.userId !== userId) {
            return res.status(403).json({ error: "Not authorized" })
        }

        res.json({
            success: true,
            plan,
        })
    } catch (error) {
        console.error("Error fetching plan:", error)
        res.status(500).json({ error: "Failed to fetch plan" })
    }
})

// Update topic completion
router.put("/:planId/topic/:topicId/complete", async (req: Request, res: Response) => {
    try {
        const { planId, topicId } = req.params
        const userId = (req as any).userId

        const plan = await StudyPlan.findById(planId)

        if (!plan || plan.userId !== userId) {
            return res.status(403).json({ error: "Not authorized" })
        }

        const topic = plan.topics.find((t) => t._id.toString() === topicId)
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" })
        }

        topic.completed = true
        topic.completedAt = new Date()

        // Calculate progress
        const completedCount = plan.topics.filter((t) => t.completed).length
        plan.progress = Math.round((completedCount / plan.topics.length) * 100)

        if (plan.progress === 100) {
            plan.status = "completed"
        }

        await plan.save()

        res.json({
            success: true,
            plan,
        })
    } catch (error) {
        console.error("Error updating topic:", error)
        res.status(500).json({ error: "Failed to update topic" })
    }
})

// Generate quizzes for a topic
router.post("/:planId/topic/:topicId/quizzes", async (req: Request, res: Response) => {
    try {
        const { planId, topicId } = req.params
        const userId = (req as any).userId

        const plan = await StudyPlan.findById(planId)

        if (!plan || plan.userId !== userId) {
            return res.status(403).json({ error: "Not authorized" })
        }

        const topic = plan.topics.find((t) => t._id.toString() === topicId)
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" })
        }

        const quizzes = await generateQuizzes(topic.title, topic.description)
        topic.quizzes = quizzes as any

        await plan.save()

        res.json({
            success: true,
            quizzes,
        })
    } catch (error) {
        console.error("Error generating quizzes:", error)
        res.status(500).json({ error: "Failed to generate quizzes" })
    }
})

// Get AI explanation
router.post("/explain", async (req: Request, res: Response) => {
    try {
        const { topic, question } = req.body

        if (!topic || !question) {
            return res.status(400).json({ error: "Missing topic or question" })
        }

        const explanation = await explainTopic(topic, question)

        res.json({
            success: true,
            explanation,
        })
    } catch (error) {
        console.error("Error explaining topic:", error)
        res.status(500).json({ error: "Failed to explain topic" })
    }
})

// Get resource recommendations
router.get("/resources/:subject", async (req: Request, res: Response) => {
    try {
        const { subject } = req.params

        if (!subject) {
            return res.status(400).json({ error: "Subject is required" })
        }

        const resources = await generateResourceRecommendations(decodeURIComponent(subject))

        res.json({
            success: true,
            resources,
        })
    } catch (error) {
        console.error("Error getting resources:", error)
        res.status(500).json({ error: "Failed to get resources" })
    }
})

// Update study notes
router.put("/:planId/topic/:topicId/notes", async (req: Request, res: Response) => {
    try {
        const { planId, topicId } = req.params
        const { notes } = req.body
        const userId = (req as any).userId

        const plan = await StudyPlan.findById(planId)

        if (!plan || plan.userId !== userId) {
            return res.status(403).json({ error: "Not authorized" })
        }

        const topic = plan.topics.find((t) => t._id.toString() === topicId)
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" })
        }

        topic.notes = notes
        await plan.save()

        res.json({
            success: true,
            topic,
        })
    } catch (error) {
        console.error("Error updating notes:", error)
        res.status(500).json({ error: "Failed to update notes" })
    }
})

export default router
