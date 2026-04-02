import mongoose from "mongoose"

export interface IStudyPlan extends mongoose.Document {
    userId: string
    subject: string
    goal: string
    level: 'beginner' | 'intermediate' | 'advanced'
    totalHours: number
    duration: number // in days
    topics: IStudyTopic[]
    progress: number
    status: 'active' | 'completed' | 'paused'
    createdAt: Date
    updatedAt: Date
}

export interface IStudyTopic {
    _id: string
    title: string
    description: string
    estimatedTime: number // in hours
    resources: string[]
    completed: boolean
    completedAt?: Date
    notes: string
    quizzes: IQuiz[]
}

export interface IQuiz {
    _id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
}

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String,
})

const topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    estimatedTime: Number,
    resources: [String],
    completed: { type: Boolean, default: false },
    completedAt: Date,
    notes: String,
    quizzes: [quizSchema],
})

const studyPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        subject: {
            type: String,
            required: true,
        },
        goal: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        totalHours: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        topics: [topicSchema],
        progress: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'paused'],
            default: 'active',
        },
    },
    { timestamps: true }
)

export default mongoose.model<IStudyPlan>("StudyPlan", studyPlanSchema)
