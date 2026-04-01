import illustration from "@/assets/illustration.svg"
import FormComponent from "@/components/forms/FormComponent"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-16 bg-gradient-to-br from-[#101624] to-[#181f2e] px-4">
            <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-8 md:flex-row md:pt-0">
                <div className="flex w-full animate-up-down justify-center md:w-1/2 md:pl-4">
                    <img
                        src={illustration}
                        alt="CodeGalaxy Illustration"
                        className="mx-auto w-[250px] md:w-[400px]"
                    />
                </div>
                <div className="flex w-full items-center justify-center md:w-1/2">
                    {user ? (
                        <FormComponent />
                    ) : (
                        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-6 p-6 sm:w-[500px] sm:p-8 bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-2xl border border-cyan-500/20 shadow-2xl">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Ready to Code Together?</h2>
                                <p className="text-gray-400 text-sm mb-6">Log in or sign up to start collaborating with the Collaborative Editor</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="px-6 py-3 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-medium transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate("/register")}
                                        className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
                                    >
                                        Sign Up
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

export default HomePage
