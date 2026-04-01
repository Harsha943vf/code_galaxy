import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useSocket } from "@/context/SocketContext"

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#38bdf8"/>
    <path d="M12 28L20 12L28 28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 28L20 20L24 28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { socket } = useSocket()

  const handleLogout = () => {
    // Disconnect socket and clear auth
    logout(socket)
    navigate("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#101624]/95 backdrop-blur border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo />
          <span className="text-xl font-bold tracking-tight text-white select-none hidden sm:inline">CodeGalaxy</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          {user && (
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Collaborative Editor</Link>
          )}
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-sm text-gray-300">
                Welcome, <span className="text-cyan-400 font-semibold">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-medium transition-colors text-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors text-sm"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
