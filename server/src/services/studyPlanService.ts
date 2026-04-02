import { GoogleGenerativeAI } from "@google/generative-ai"

// Use separate API key for Study Planner to avoid rate limiting
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_STUDY || process.env.GEMINI_API_KEY || "")

// Mock study plan for development/testing when API key is invalid
const getMockStudyPlan = (request: StudyPlanRequest): GeneratedStudyPlan => {
    const topicsPerSubject: { [key: string]: GeneratedStudyPlan["topics"] } = {
        javascript: [
            {
                title: "JavaScript Fundamentals",
                description: "Learn variables, data types, and basic syntax",
                estimatedTime: 2,
                resources: ["MDN Web Docs - JavaScript Basics", "JavaScript.info - Introduction"]
            },
            {
                title: "Functions and Scope",
                description: "Understanding functions, scope, and closures",
                estimatedTime: 2.5,
                resources: ["MDN - Functions", "Eloquent JavaScript Chapter 3"]
            },
            {
                title: "Objects and Arrays",
                description: "Working with objects, arrays, and their methods",
                estimatedTime: 2,
                resources: ["MDN - Objects", "JavaScript.info - Objects"]
            },
            {
                title: "DOM Manipulation",
                description: "Selecting and modifying HTML elements",
                estimatedTime: 2,
                resources: ["MDN - DOM API", "W3Schools - DOM Tutorial"]
            },
            {
                title: "Async JavaScript",
                description: "Promises, async/await, and callbacks",
                estimatedTime: 1.5,
                resources: ["MDN - Promises", "JavaScript.info - Promises"]
            }
        ],
        python: [
            {
                title: "Python Basics",
                description: "Learn variables, data types, and syntax",
                estimatedTime: 2,
                resources: ["Python Official Docs", "Real Python Tutorials"]
            },
            {
                title: "Control Flow",
                description: "If statements, loops, and conditionals",
                estimatedTime: 2,
                resources: ["W3Schools Python", "Codecademy Python Course"]
            },
            {
                title: "Functions and Modules",
                description: "Creating and using functions and modules",
                estimatedTime: 2,
                resources: ["Real Python Functions", "Python Docs"]
            },
            {
                title: "Working with Data",
                description: "Lists, dictionaries, and data manipulation",
                estimatedTime: 2,
                resources: ["NumPy Documentation", "Pandas Tutorials"]
            },
            {
                title: "File Handling and Libraries",
                description: "Reading/writing files and using popular libraries",
                estimatedTime: 2,
                resources: ["Python File I/O", "Popular Python Libraries Guide"]
            }
        ],
    }

    const subjectKey = request.subject.toLowerCase()
    const defaultTopics: GeneratedStudyPlan["topics"] = [
        {
            title: `${request.subject} - Introduction`,
            description: `Introduction to ${request.subject}`,
            estimatedTime: request.totalHours * 0.2,
            resources: [`Official ${request.subject} Documentation`, `${request.subject} Tutorial`]
        },
        {
            title: `${request.subject} - Core Concepts`,
            description: `Core concepts of ${request.subject}`,
            estimatedTime: request.totalHours * 0.3,
            resources: [`${request.subject} Best Practices`, `Advanced ${request.subject}`]
        },
        {
            title: `${request.subject} - Practice Projects`,
            description: `Build real projects with ${request.subject}`,
            estimatedTime: request.totalHours * 0.3,
            resources: [`Project Ideas for ${request.subject}`, `GitHub Projects`]
        },
        {
            title: `${request.subject} - Advanced Topics`,
            description: `Advanced topics and optimization`,
            estimatedTime: request.totalHours * 0.2,
            resources: [`${request.subject} Performance Guide`, `${request.subject} Design Patterns`]
        }
    ]

    return {
        topics: topicsPerSubject[subjectKey] || defaultTopics
    }
}

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
        console.log("Calling Gemini API with model: gemini-1.5-flash")
        console.log("Request:", request)
        
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        console.log("Gemini API response received, length:", responseText.length)
        console.log("First 200 chars:", responseText.substring(0, 200))

        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            console.error("No JSON found in response:", responseText)
            throw new Error("No JSON found in response")
        }

        const parsedPlan = JSON.parse(jsonMatch[0])
        console.log("Parsed plan topics:", parsedPlan.topics?.length)
        return parsedPlan
    } catch (error: any) {
        console.error("Error generating study plan with Gemini API:", error.message)
        console.log("Falling back to mock study plan")
        
        // If Gemini API fails, use mock data for development
        if (error.status === 403 || error.message.includes("Method doesn't allow unregistered callers")) {
            console.warn("⚠️  Gemini API Key issue detected. Using mock study plan.")
            console.warn("To fix: Update GEMINI_API_KEY in .env with a valid API key from Google Cloud Console")
            return getMockStudyPlan(request)
        }
        
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
    } catch (error: any) {
        console.error("Error generating quizzes with Gemini API:", error.message)
        
        // Fallback: Return mock quizzes
        if (error.status === 403 || error.message.includes("Method doesn't allow unregistered callers")) {
            return [
                {
                    question: `What is the main concept of ${topic}?`,
                    options: ["Definition A", "Definition B", "Definition C", "Definition D"],
                    correctAnswer: 0,
                    explanation: `${description} - The main concept is Definition A.`
                },
                {
                    question: `How is ${topic} commonly used?`,
                    options: ["Use case 1", "Use case 2", "Use case 3", "Use case 4"],
                    correctAnswer: 1,
                    explanation: "Use case 2 is the most common application."
                },
                {
                    question: `What are the benefits of learning ${topic}?`,
                    options: ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
                    correctAnswer: 2,
                    explanation: `${topic} provides Benefit 3 among other advantages.`
                },
                {
                    question: `Which is advanced in ${topic}?`,
                    options: ["Advanced topic 1", "Advanced topic 2", "Advanced topic 3", "Advanced topic 4"],
                    correctAnswer: 0,
                    explanation: "Advanced topic 1 is a key advanced concept."
                },
                {
                    question: `How to practice ${topic}?`,
                    options: ["Practice method 1", "Practice method 2", "Practice method 3", "Practice method 4"],
                    correctAnswer: 1,
                    explanation: "Practice method 2 is the most effective way to learn."
                }
            ]
        }
        
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
    } catch (error: any) {
        console.error("Error explaining topic with Gemini API:", error.message)
        
        // Fallback: Return a default explanation
        if (error.status === 403 || error.message.includes("Method doesn't allow unregistered callers")) {
            return `
Explanation of ${topic}:

The question you asked: "${question}"

Understanding the Basics:
${topic} is a fundamental concept that can be understood through several key components:

Key Concepts:
1. Basic Understanding - Start with the fundamentals and build your knowledge gradually
2. Real-World Applications - ${topic} is used in many practical scenarios
3. Best Practices - Following established patterns helps you use ${topic} effectively
4. Common Pitfalls - Be aware of common mistakes when working with ${topic}

Practical Examples:
- Example 1: A real-world use case of ${topic}
- Example 2: How ${topic} improves efficiency
- Example 3: Integration with other concepts

Tips for Learning:
- Practice regularly with small examples
- Build projects to apply your knowledge
- Study from multiple sources
- Ask questions when confused
- Review and revise frequently

Further Resources:
- Official documentation
- Interactive tutorials
- Video courses
- Practice exercises

Remember: Learning ${topic} takes time and practice. Don't get discouraged if you don't understand everything immediately!
            `
        }
        
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
    } catch (error: any) {
        console.error("Error generating recommendations with Gemini API:", error.message)
        
        // Fallback: Return mock resources
        if (error.status === 403 || error.message.includes("Method doesn't allow unregistered callers")) {
            return [
                `Official ${subject} Documentation - https://docs.example.com`,
                `${subject} Tutorial on W3Schools - https://w3schools.com`,
                `freeCodeCamp ${subject} Course - https://freecodecamp.org`,
                `${subject} on MDN Web Docs - https://developer.mozilla.org`,
                `Real Python - ${subject} Guide - https://realpython.com`,
                `${subject} Tutorial on YouTube - Search your preferred channel`,
                `Codecademy Interactive ${subject} Course - https://codecademy.com`,
                `${subject} Community on Stack Overflow - https://stackoverflow.com`,
                `Open-source ${subject} Projects - https://github.com`,
                `${subject} Blog Posts and Articles - Medium, Dev.to, Hashnode`
            ]
        }
        
        return []
    }
}

