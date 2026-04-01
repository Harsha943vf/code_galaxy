import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import GitHubCorner from "./components/GitHubCorner"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import Landingpage from "./pages/Landingpage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"
import { Navbar } from "./components/Navbar"

const App = () => {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <div className="pt-16">
                        <Routes>
                            <Route path="/" element={<Landingpage />} />
                            <Route path="/homepage" element={<HomePage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/editor" element={<EditorPage />} />
                            <Route path="/editor/:roomId" element={<EditorPage />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
            <Toast /> {/* Toast component from react-hot-toast */}
            <GitHubCorner />
        </>
    )
}

export default App
