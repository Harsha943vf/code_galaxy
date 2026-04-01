import { useState } from "react"
import { Link } from "react-router-dom"
import { IoArrowBack, IoCodeSlash, IoMail, IoLocation, IoGlobe } from "react-icons/io5"
import { LuGithub, LuTwitter, LuLinkedin, LuMessageSquare } from "react-icons/lu"
import { toast } from "react-hot-toast"

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setIsSubmitting(false)
    }

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
                <div className="mx-auto max-w-7xl text-center">
                    <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                        Get in
                        <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                            {" "}Touch
                        </span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-300">
                        Have questions about Code-Galaxy? Want to collaborate or report an issue? 
                        We'd love to hear from you.
                    </p>
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
                    {/* Contact Form */}
                    <div className="space-y-8">
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-primary/20 p-2">
                                    <LuMessageSquare size={24} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-darkHover bg-dark px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-darkHover bg-dark px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-darkHover bg-dark px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full rounded-lg border border-darkHover bg-dark px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg bg-gradient-to-r from-primary to-blue-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-primary/90 hover:to-blue-500/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/20 p-3">
                                        <IoMail size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Email</h3>
                                        <p className="text-gray-300">hello@codesync.dev</p>
                                        <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-blue-500/20 p-3">
                                        <IoLocation size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Location</h3>
                                        <p className="text-gray-300">Global Team</p>
                                        <p className="text-sm text-gray-400">Working remotely worldwide</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-green-500/20 p-3">
                                        <IoGlobe size={20} className="text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Website</h3>
                                        <p className="text-gray-300">codesync.dev</p>
                                        <p className="text-sm text-gray-400">Visit our platform</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <h2 className="mb-6 text-2xl font-bold text-white">Follow Us</h2>
                            <div className="grid gap-4">
                                <a 
                                    href="https://github.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-lg border border-darkHover bg-dark p-4 transition-all duration-200 hover:border-primary hover:bg-darkSecondary"
                                >
                                    <LuGithub size={24} className="text-white" />
                                    <div>
                                        <h3 className="font-semibold text-white">GitHub</h3>
                                        <p className="text-sm text-gray-400">Check out our projects</p>
                                    </div>
                                </a>
                                
                                <a 
                                    href="https://twitter.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-lg border border-darkHover bg-dark p-4 transition-all duration-200 hover:border-blue-400 hover:bg-darkSecondary"
                                >
                                    <LuTwitter size={24} className="text-blue-400" />
                                    <div>
                                        <h3 className="font-semibold text-white">Twitter</h3>
                                        <p className="text-sm text-gray-400">Follow for updates</p>
                                    </div>
                                </a>
                                
                                <a 
                                    href="https://linkedin.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-lg border border-darkHover bg-dark p-4 transition-all duration-200 hover:border-blue-600 hover:bg-darkSecondary"
                                >
                                    <LuLinkedin size={24} className="text-blue-600" />
                                    <div>
                                        <h3 className="font-semibold text-white">LinkedIn</h3>
                                        <p className="text-sm text-gray-400">Connect with our team</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="rounded-xl border border-darkHover bg-darkSecondary p-8">
                            <h2 className="mb-6 text-2xl font-bold text-white">Quick Help</h2>
                            <div className="space-y-4">
                                <div className="rounded-lg bg-dark p-4">
                                    <h3 className="font-semibold text-white">How do I start collaborating?</h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Create a room and share the room ID with your team members.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-dark p-4">
                                    <h3 className="font-semibold text-white">Is Code-Galaxy free to use?</h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Yes, Code-Galaxy is completely free for all users.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-dark p-4">
                                    <h3 className="font-semibold text-white">What languages are supported?</h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        We support 100+ programming languages through our execution engine.
                                    </p>
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
                        <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                            About
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ContactPage;