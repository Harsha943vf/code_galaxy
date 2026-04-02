import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface StudyPlanRequest {
    subject: string
    goal: string
    level: 'beginner' | 'intermediate' | 'advanced'
    totalHours: number
    duration: number // days
}

export interface GeneratedStudyPlan {
    topics: Array<{
        title: string
        description: string
        estimatedTime: number
        resources: string[]
    }>
}

export async function generateStudyPlan(
    request: StudyPlanRequest
): Promise<GeneratedStudyPlan> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Create a comprehensive study plan for:
Subject: ${request.subject}
Goal: ${request.goal}
Level: ${request.level}
Total Hours Available: ${request.totalHours}
Duration: ${request.duration} days

Return a JSON object with this structure (ONLY JSON, no other text):
{
    "topics": [
        {
            "title": "Topic name",
            "description": "What will be learned",
            "estimatedTime": 2,
            "resources": ["resource1", "resource2"]
        }
    ]
}

Make sure:
- Topics are ordered from basic to advanced
- Estimated time adds up to approximately ${request.totalHours} hours
- Resources are specific and helpful
- Return ONLY valid JSON`

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error("No JSON found in response")
        }

        const parsedPlan = JSON.parse(jsonMatch[0])
        return parsedPlan
    } catch (error) {
        console.error("Error generating study plan:", error)
        throw error
    }
}

export async function generateQuizzes(
    topic: string,
    description: string,
    count: number = 5
): Promise<
    Array<{
        question: string
        options: string[]
        correctAnswer: number
        explanation: string
    }>
> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Generate ${count} quiz questions about:
Topic: ${topic}
Description: ${description}

Return a JSON array with this structure (ONLY JSON, no other text):
[
    {
        "question": "Question text?",
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": 0,
        "explanation": "Why this answer is correct"
    }
]

Make sure:
- Questions are clear and specific
- All options are plausible
- Correct answer index is 0-3
- Explanations are educational
- Return ONLY valid JSON`

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
            throw new Error("No JSON found in response")
        }

        const quizzes = JSON.parse(jsonMatch[0])
        return quizzes
    } catch (error) {
        console.error("Error generating quizzes:", error)
        throw error
    }
}

export async function explainTopic(topic: string, question: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an expert tutor. Explain this clearly and concisely:

Topic: ${topic}
Question: ${question}

Provide:
- Clear explanation
- Real-world examples
- Key concepts
- Tips for understanding`

    try {
        const result = await model.generateContent(prompt)
        return result.response.text()
    } catch (error) {
        console.error("Error explaining topic:", error)
        throw error
    }
}

export async function generateResourceRecommendations(subject: string): Promise<string[]> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Recommend 10 best free resources (websites, YouTube channels, books, tools) for learning:
Subject: ${subject}

Format as JSON array of strings, like:
["Resource 1 - Link or description", "Resource 2 - Link or description"]

Return ONLY the JSON array.`

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
            throw new Error("No JSON found in response")
        }

        return JSON.parse(jsonMatch[0])
    } catch (error) {
        console.error("Error generating recommendations:", error)
        return []
    }
}
