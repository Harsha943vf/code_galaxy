import { Link } from "react-router-dom"
import { IoArrowBack, IoCodeSlash, IoPeople, IoRocket, IoSettings } from "react-icons/io5"
import { LuSparkles, LuUsers, LuZap } from "react-icons/lu"

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-dark text-white">
            {/* Navigation Header */}
            <nav className="border-b border-darkHover bg-darkSecondary px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        <IoArrowBack size={20} />
                        <span className="font-semibold">Back to Code-Galaxy</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <IoCodeSlash size={24} className="text-primary" />
                        <span className="text-xl font-bold">Code-Galaxy</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-darkSecondary via-dark to-darkSecondary px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center">
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                            Collaborative
                            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                {" "}Coding{" "}
                            </span>
                            Platform
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-gray-300">
                            Experience real-time collaborative coding with AI assistance, 
                            drawing tools, and seamless team communication.
                        </p>
                    </div>
                </div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
                </div>
            </section>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Who We Are */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg bg-primary/20 p-2">
                                    <IoPeople size={24} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Who We Are</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                Code-Galaxy is a cutting-edge collaborative development platform designed for modern teams. 
                                We bridge the gap between individual coding and team collaboration, providing a seamless 
                                environment where developers can code, draw, and communicate in real-time.
                            </p>
                        </div>

                        {/* Our Mission */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg bg-blue-500/20 p-2">
                                    <IoRocket size={24} className="text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                To revolutionize collaborative development by providing an all-in-one platform that 
                                combines real-time coding, AI-powered assistance, visual collaboration tools, and 
                                seamless communication. We believe in making team development more efficient, 
                                creative, and enjoyable.
                            </p>
                        </div>

                        {/* Why Choose Code-Galaxy */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-green-500/20 p-2">
                                    <LuZap size={24} className="text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Why Choose Code-Galaxy?</h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                                    <div>
                                        <h3 className="font-semibold text-white">Real-time Collaboration</h3>
                                        <p className="text-sm text-gray-400">Live coding with cursor tracking and instant sync</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-400"></div>
                                    <div>
                                        <h3 className="font-semibold text-white">AI Code Generation</h3>
                                        <p className="text-sm text-gray-400">Powered by advanced AI models for smart coding</p>
                                    </div>
                                </div>
                                {/* <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-green-400"></div>
                                    <div>
                                        <h3 className="font-semibold text-white">Visual Collaboration</h3>
                                        <p className="text-sm text-gray-400">Built-in drawing tools for brainstorming</p>
                                    </div>
                                </div> */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-purple-400"></div>
                                    <div>
                                        <h3 className="font-semibold text-white">Multi-language Support</h3>
                                        <p className="text-sm text-gray-400">Execute code in 40+ programming languages</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-yellow-400"></div>
                                    <div>
                                        <h3 className="font-semibold text-white">Team Communication</h3>
                                        <p className="text-sm text-gray-400">Integrated chat with typing indicators</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-red-400"></div>
                                    <div>
                                        <h3 className="font-semibold text-white">Modern Interface</h3>
                                        <p className="text-sm text-gray-400">Dark theme with responsive design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual Elements */}
                    <div className="space-y-8">
                        {/* Feature Cards */}
                        <div className="grid gap-6">
                            <div className="rounded-xl border border-darkHover bg-gradient-to-br from-primary/10 to-transparent p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <LuSparkles size={28} className="text-primary" />
                                    <h3 className="text-xl font-bold text-white">AI-Powered Development</h3>
                                </div>
                                <p className="text-gray-300">
                                    Leverage advanced AI models to generate code, debug issues, and get intelligent 
                                    suggestions through AI.
                                </p>
                            </div>

                            <div className="rounded-xl border border-darkHover bg-gradient-to-br from-blue-500/10 to-transparent p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <LuUsers size={28} className="text-blue-400" />
                                    <h3 className="text-xl font-bold text-white">Team Collaboration</h3>
                                </div>
                                <p className="text-gray-300">
                                    Work together seamlessly with live cursor tracking, file synchronization, 
                                    and instant communication tools.
                                </p>
                            </div>

                            <div className="rounded-xl border border-darkHover bg-gradient-to-br from-green-500/10 to-transparent p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <IoSettings size={28} className="text-green-400" />
                                    <h3 className="text-xl font-bold text-white">Advanced Features</h3>
                                </div>
                                <p className="text-gray-300">
                                    From code execution to team communication, everything you need for 
                                    modern development workflows.
                                </p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-6">
                            <h3 className="mb-6 text-xl font-bold text-white">Platform Statistics</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">40+</div>
                                    <div className="text-sm text-gray-400">Languages Supported</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400">Real-time</div>
                                    <div className="text-sm text-gray-400">Collaboration</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-400">AI</div>
                                    <div className="text-sm text-gray-400">Code Generation</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-400">∞</div>
                                    <div className="text-sm text-gray-400">Possibilities</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-darkHover bg-darkSecondary px-6 py-8">
                <div className="mx-auto max-w-7xl text-center">
                    <p className="text-gray-400">
                        &copy; 2026 Code-Galaxy. Empowering collaborative development worldwide.
                    </p>
                    <div className="mt-4 flex justify-center gap-6">
                        <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
                            Home
                        </Link>
                        <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AboutPage;