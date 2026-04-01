import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-hot-toast"

function Landingpage() {
  const navigate = useNavigate()

  const handleEditorClick = () => {
    const roomId = uuidv4()
    navigate(`/homepage`, { state: { roomId } })
  }

  const handleAIPlanner = () => {
    toast.success("AI Study Planner coming soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101624] to-[#181f2e] text-white flex flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        {/* CodeGalaxy Illustration */}
        <div className="mb-12 text-center">
          <pre className="text-sm md:text-base text-cyan-400 font-mono mb-4 overflow-hidden">
{`
 ⭐ ✨ ⭐ CODE GALAXY ⭐ ✨ ⭐
  
   ╔═══════════════════════╗
   ║  💻   💻   💻   💻  ║
   ║                       ║
   ║  🌌 CODE GALAXY 🌌  ║
   ║                       ║
   ║  💻   💻   💻   💻  ║
   ╚═══════════════════════╝
   
   🚀 Real-time Collaboration 🚀
   ✨ Infinite Possibilities ✨
`}
          </pre>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Struggling to collaborate with your friends?
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-300 mb-12">
          Try out our Collaborative Code Editor!
        </p>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
          
          <button
            onClick={handleEditorClick}
            className="flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold text-lg py-4 shadow-lg transition-all transform hover:scale-105"
          >
            ✨ Collaborative Editor
          </button>
          <button
            onClick={handleAIPlanner}
            className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg py-4 shadow-lg transition-all transform hover:scale-105"
          >
            🤖 AI Study Planner
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Real-time Sync</h3>
            <p className="text-gray-400">See changes from your team instantly</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Run Code</h3>
            <p className="text-gray-400">Execute code right in the editor</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Copilot</h3>
            <p className="text-gray-400">Get AI suggestions while coding</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 px-8 py-6 text-center text-gray-500 text-sm">
        <p>© 2026 CodeGalaxy. All rights reserved. | Made with ❤️</p>
      </footer>
    </div>
  )
}

export default Landingpage