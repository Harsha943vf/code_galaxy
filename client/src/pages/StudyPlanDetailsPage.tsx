import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-hot-toast"
import { IoArrowBack, IoCheckmark, IoBook } from "react-icons/io5"

interface Topic {
    _id: string
    title: string
    description: string
    estimatedTime: number
    resources: string[]
    completed: boolean
    completedAt?: string
    notes: string
    quizzes: unknown[]
}

interface StudyPlan {
    _id: string
    subject: string
    goal: string
    level: string
    totalHours: number
    duration: number
    progress: number
    status: string
    topics: Topic[]
    createdAt: string
}

const StudyPlanDetailsPage = () => {
    const { planId } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [plan, setPlan] = useState<StudyPlan | null>(null)
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const [notes, setNotes] = useState("")

    const fetchPlan = async () => {
        try {
            const token = localStorage.getItem("cgc_auth_token")
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/study-plans/${planId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.ok) {
                const data = await response.json()
                setPlan(data.plan)
                if (data.plan.topics.length > 0) {
                    setSelectedTopic(data.plan.topics[0])
                    setNotes(data.plan.topics[0].notes || "")
                }
            }
        } catch (error) {
            console.error("Error fetching plan:", error)
            toast.error("Failed to load study plan")
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
            return
        }
        fetchPlan()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [planId])

    const handleCompleteTopicAsync = async (topicId: string) => {
        if (!plan) return

        try {
            const token = localStorage.getItem("cgc_auth_token")
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/study-plans/${planId}/topic/${topicId}/complete`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.ok) {
                const data = await response.json()
                setPlan(data.plan)
                toast.success("Topic marked as completed!")
            }
        } catch (error) {
            console.error("Error completing topic:", error)
            toast.error("Failed to update topic")
        }
    }

    const handleSaveNotes = async () => {
        if (!plan || !selectedTopic) return

        try {
            const token = localStorage.getItem("cgc_auth_token")
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/study-plans/${planId}/topic/${selectedTopic._id}/notes`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ notes }),
                }
            )

            if (response.ok) {
                toast.success("Notes saved!")
            }
        } catch (error) {
            console.error("Error saving notes:", error)
            toast.error("Failed to save notes")
        }
    }

    if (!plan) {
        return (
            <div className="min-h-screen bg-dark text-white flex items-center justify-center">
                <p>Loading study plan...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark text-white">
            {/* Header */}
            <nav className="border-b border-darkHover bg-darkSecondary px-6 py-4">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                    <button
                        onClick={() => navigate("/study-planner")}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        <IoArrowBack size={20} />
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold">{plan.subject}</h1>
                </div>
            </nav>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Topics List */}
                    <div className="lg:col-span-1">
                        <div className="bg-darkSecondary border border-darkHover rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <IoBook size={20} className="text-primary" />
                                Topics ({plan.topics.length})
                            </h2>

                            <div className="space-y-2">
                                {plan.topics.map((topic) => (
                                    <button
                                        key={topic._id}
                                        onClick={() => {
                                            setSelectedTopic(topic)
                                            setNotes(topic.notes || "")
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                                            selectedTopic?._id === topic._id
                                                ? "bg-primary text-white"
                                                : "bg-dark border border-darkHover hover:border-primary text-gray-300"
                                        }`}
                                    >
                                        <span className="flex-1 truncate">{topic.title}</span>
                                        {topic.completed && (
                                            <IoCheckmark size={18} className="ml-2 flex-shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="mt-6 pt-6 border-t border-darkHover">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Overall Progress</span>
                                    <span className="font-bold text-primary">{plan.progress}%</span>
                                </div>
                                <div className="w-full bg-dark rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all"
                                        style={{ width: `${plan.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Topic Details */}
                    {selectedTopic && (
                        <div className="lg:col-span-2">
                            <div className="bg-darkSecondary border border-darkHover rounded-lg p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedTopic.title}</h2>
                                        <p className="text-gray-400 mt-1">
                                            Estimated: {selectedTopic.estimatedTime} hours
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleCompleteTopicAsync(selectedTopic._id)}
                                        disabled={selectedTopic.completed}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                            selectedTopic.completed
                                                ? "bg-green-500/20 text-green-400 cursor-default"
                                                : "bg-primary hover:bg-primary/90 text-white"
                                        }`}
                                    >
                                        <IoCheckmark size={18} />
                                        {selectedTopic.completed ? "Completed" : "Mark Complete"}
                                    </button>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-2">Description</h3>
                                    <p className="text-gray-300">{selectedTopic.description}</p>
                                </div>

                                {/* Resources */}
                                {selectedTopic.resources.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold mb-3">Resources</h3>
                                        <div className="space-y-2">
                                            {selectedTopic.resources.map((resource, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-dark border border-darkHover rounded p-3 text-gray-300 text-sm hover:border-primary transition-colors"
                                                >
                                                    {resource}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-2">My Notes</h3>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add your study notes here..."
                                        rows={5}
                                        className="w-full bg-dark border border-darkHover rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none resize-none"
                                    />
                                    <button
                                        onClick={handleSaveNotes}
                                        className="mt-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                                    >
                                        Save Notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudyPlanDetailsPage
