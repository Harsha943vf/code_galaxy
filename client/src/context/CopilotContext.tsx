import { ICopilotContext } from "@/types/copilot"
import { createContext, ReactNode, useContext, useState } from "react"
import toast from "react-hot-toast"
import axiosInstance from "../api/gemini"

const CopilotContext = createContext<ICopilotContext | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useCopilot = () => {
    const context = useContext(CopilotContext)
    if (context === null) {
        throw new Error(
            "useCopilot must be used within a CopilotContextProvider",
        )
    }
    return context
}

const CopilotContextProvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const generateCode = async () => {
        if (input.trim().length === 0) {
            toast.error("Please write a prompt")
            return
        }

        const toastId = toast.loading("Gemini is thinking...")
        setIsRunning(true)

        try {
            // We've wrapped the system instructions into the prompt 
            // to ensure Gemini only returns pure code.
            const systemPrompt = `You are a code generator copilot for a project named CodeGalaxy. 
            Generate code based on the following prompt: "${input}".
            Return ONLY the code. Do not include explanations, markdown backticks, or extra text. 
            If you cannot generate code for this, respond with "I don't know".`

            // UPDATED: Calling /chat on your local backend
            const response = await axiosInstance.post("/chat", {
                prompt: systemPrompt
            })

            if (response.data && response.data.reply) {
                toast.success("Code generated successfully", { id: toastId })
                setOutput(response.data.reply)
            } else {
                throw new Error("No response from AI")
            }
        } catch (error: unknown) {
            console.error("Copilot Error:", error)
            toast.error("Failed to generate the code", { id: toastId })
        } finally {
            setIsRunning(false)
            toast.dismiss(toastId)
        }
    }

    return (
        <CopilotContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                generateCode,
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}

export { CopilotContextProvider }
export default CopilotContext
