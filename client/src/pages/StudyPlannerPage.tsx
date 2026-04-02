import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-hot-toast"
import { IoArrowBack, IoBook, IoPlay } from "react-icons/io5"

interface StudyPlan {
    _id: string
    subject: string
    goal: string
    level: string
    totalHours: number
    duration: number
    progress: number
    status: string
    topics: unknown[]
    createdAt: string
}

const StudyPlannerPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [activeTab, setActiveTab] = useState<'create' | 'myPlans'>('myPlans')
    const [plans, setPlans] = useState<StudyPlan[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        subject: '',
        goal: '',
        level: 'beginner',
        totalHours: 20,
        duration: 14,
    })

    // Check authentication
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Study Planner</h1>
                    <p className="text-gray-300 mb-6">Please login to create study plans</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
                    >
                        Login Now
                    </button>
                </div>
            </div>
        )
    }

    const fetchMyPlans = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/study-plans`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setPlans(data.plans || [])
            }
        } catch (error) {
            console.error('Error fetching plans:', error)
            toast.error('Failed to fetch study plans')
        }
    }

    const handleCreatePlan = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/study-plans/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const data = await response.json()
                toast.success('Study plan created successfully!')
                setFormData({
                    subject: '',
                    goal: '',
                    level: 'beginner',
                    totalHours: 20,
                    duration: 14,
                })
                setActiveTab('myPlans')
                fetchMyPlans()
                navigate(`/study-plan/${data.plan._id}`)
            } else {
                const error = await response.json()
                toast.error(error.error || 'Failed to create plan')
            }
        } catch (error) {
            console.error('Error creating plan:', error)
            toast.error('Failed to create study plan')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-dark text-white">
            {/* Header */}
            <nav className="border-b border-darkHover bg-darkSecondary px-6 py-4">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        <IoArrowBack size={20} />
                        <span>Back to Home</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <IoBook size={24} className="text-primary" />
                        <span className="text-xl font-bold">AI Study Planner</span>
                    </div>
                </div>
            </nav>

            {/* Tabs */}
            <div className="border-b border-darkHover bg-darkSecondary">
                <div className="mx-auto max-w-7xl flex px-6">
                    <button
                        onClick={() => {
                            setActiveTab('create')
                        }}
                        className={`py-4 px-6 font-semibold transition-colors border-b-2 ${
                            activeTab === 'create'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        Create New Plan
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('myPlans')
                            fetchMyPlans()
                        }}
                        className={`py-4 px-6 font-semibold transition-colors border-b-2 ${
                            activeTab === 'myPlans'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        My Study Plans
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 py-12">
                {activeTab === 'create' ? (
                    // Create Plan Form
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold mb-8">Create Your Study Plan</h2>

                        <form onSubmit={handleCreatePlan} className="space-y-6">
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., React, Machine Learning, Python"
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subject: e.target.value })
                                    }
                                    required
                                    className="w-full bg-dark border border-darkHover rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                                />
                            </div>

                            {/* Goal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Learning Goal
                                </label>
                                <textarea
                                    placeholder="What do you want to achieve? e.g., Build a web app, Pass an exam"
                                    value={formData.goal}
                                    onChange={(e) =>
                                        setFormData({ ...formData, goal: e.target.value })
                                    }
                                    required
                                    rows={3}
                                    className="w-full bg-dark border border-darkHover rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none resize-none"
                                />
                            </div>

                            {/* Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Experience Level
                                </label>
                                <select
                                    value={formData.level}
                                    onChange={(e) =>
                                        setFormData({ ...formData, level: e.target.value })
                                    }
                                    className="w-full bg-dark border border-darkHover rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Total Hours */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Total Study Hours: {formData.totalHours}
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="5"
                                    value={formData.totalHours}
                                    onChange={(e) =>
                                        setFormData({ ...formData, totalHours: parseInt(e.target.value) })
                                    }
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-400 mt-2">
                                    {Math.ceil(formData.totalHours / formData.duration)} hours per day
                                </p>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Duration (Days): {formData.duration}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="90"
                                    step="1"
                                    value={formData.duration}
                                    onChange={(e) =>
                                        setFormData({ ...formData, duration: parseInt(e.target.value) })
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <IoPlay size={20} />
                                {isLoading ? 'Creating Plan...' : 'Create Study Plan'}
                            </button>
                        </form>
                    </div>
                ) : (
                    // My Plans
                    <div>
                        <h2 className="text-3xl font-bold mb-8">My Study Plans</h2>

                        {plans.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-400 mb-6">No study plans yet</p>
                                <button
                                    onClick={() => setActiveTab('create')}
                                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
                                >
                                    Create Your First Plan
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {plans.map((plan) => (
                                    <div
                                        key={plan._id}
                                        onClick={() => navigate(`/study-plan/${plan._id}`)}
                                        className="bg-darkSecondary border border-darkHover rounded-lg p-6 hover:border-primary cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-bold text-white flex-1">{plan.subject}</h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    plan.status === 'completed'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : plan.status === 'active'
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                }`}
                                            >
                                                {plan.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm mb-4">{plan.goal}</p>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Progress</span>
                                                <span className="text-white font-semibold">{plan.progress}%</span>
                                            </div>
                                            <div className="w-full bg-dark rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all"
                                                    style={{ width: `${plan.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-darkHover text-sm text-gray-400">
                                            <span>{plan.topics.length} topics</span>
                                            <span>{plan.totalHours}h total</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudyPlannerPage
