import axiosInstance from "@/api/oneCompiler"
import { Language, RunContext as RunContextType } from "@/types/run"
import langMap from "lang-map"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useFileSystem } from "./FileContext"

// Define this locally since OneCompiler doesn't have a /runtimes endpoint
const ONECOMPILER_LANGUAGES: Language[] = [
    // POPULAR LANGUAGES
    { language: "python", version: "3", aliases: ["py", "python3"] },
    { language: "javascript", version: "latest", aliases: ["js", "jsx"] },
    { language: "typescript", version: "latest", aliases: ["ts", "tsx"] },
    { language: "c", version: "latest", aliases: ["c"] },
    { language: "cpp", version: "latest", aliases: ["cpp", "h", "hpp"] },
    { language: "java", version: "latest", aliases: ["java"] },
    { language: "csharp", version: "latest", aliases: ["cs"] },
    { language: "go", version: "latest", aliases: ["go"] },
    { language: "rust", version: "latest", aliases: ["rs"] },
    { language: "php", version: "latest", aliases: ["php"] },
    { language: "ruby", version: "latest", aliases: ["rb"] },
    { language: "swift", version: "latest", aliases: ["swift"] },
    { language: "kotlin", version: "latest", aliases: ["kt", "kts"] },

    // SYSTEMS & SHELL
    { language: "bash", version: "latest", aliases: ["sh", "bash"] },
    { language: "assembly", version: "latest", aliases: ["asm", "s"] },
    { language: "fortran", version: "latest", aliases: ["f", "f90", "for"] },
    { language: "pascal", version: "latest", aliases: ["pas", "p"] },
    
    // DATABASES
    { language: "mysql", version: "latest", aliases: ["mysql"] },
    { language: "postgresql", version: "latest", aliases: ["pgsql", "postgres"] },
    { language: "mongodb", version: "latest", aliases: ["mongodb", "mongo"] },
    { language: "sqlite", version: "latest", aliases: ["sqlite", "db"] },
    { language: "mariadb", version: "latest", aliases: ["mariadb"] },

    // NICHE & ACADEMIC
    { language: "haskell", version: "latest", aliases: ["hs"] },
    { language: "lua", version: "latest", aliases: ["lua"] },
    { language: "r", version: "latest", aliases: ["r"] },
    { language: "perl", version: "latest", aliases: ["pl"] },
    { language: "cobol", version: "latest", aliases: ["cbl", "cob"] },
    { language: "prolog", version: "latest", aliases: ["pl", "pro"] },
    { language: "scala", version: "latest", aliases: ["scala"] },
    { language: "erlang", version: "latest", aliases: ["erl"] },
    { language: "elixir", version: "latest", aliases: ["ex", "exs"] },
    { language: "clojure", version: "latest", aliases: ["clj", "cljs"] },
];

const RunCodeContext = createContext<RunContextType | null>(null)

export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (context === null) {
        throw new Error(
            "useRunCode must be used within a RunCodeContextProvider",
        )
    }
    return context
}

const RunCodeContextProvider = ({ children }: { children: ReactNode }) => {
    const { activeFile } = useFileSystem()
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [supportedLanguages] = useState<Language[]>(ONECOMPILER_LANGUAGES)
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({
        language: "", version: "", aliases: [],
    })

    // Auto-select language logic based on file extension
    useEffect(() => {
        if (!activeFile?.name) return
        const extension = activeFile.name.split(".").pop() || ""
        const languageNames = langMap.languages(extension)
        
        const language = supportedLanguages.find(
            (lang) =>
                lang.aliases.includes(extension) ||
                languageNames.some(name => name.toLowerCase().includes(lang.language.toLowerCase())),
        )
        if (language) setSelectedLanguage(language)
    }, [activeFile?.name, supportedLanguages])

    const runCode = async () => {
        if (!selectedLanguage.language) return toast.error("Please select a language")
        if (!activeFile) return toast.error("Please open a file")

        setIsRunning(true)
        const toastId = toast.loading("Running code...")

        try {
            // UPDATED: Calling /compile (your local proxy) instead of /run
            const response = await axiosInstance.post("/compile", {
                language: selectedLanguage.language,
                stdin: input,
                files: [
                    {
                        name: activeFile.name,
                        content: activeFile.content
                    }
                ]
            })

            const { stdout, stderr, exception } = response.data

            // OneCompiler returns execution results directly in the root of data
            if (stderr || exception) {
                setOutput(stderr || exception)
                toast.error("Execution finished with errors")
            } else {
                setOutput(stdout || "No output")
                toast.success("Execution successful")
            }
        } catch (error: any) {
            console.error("Run Error:", error)
            const errorMessage = error.response?.data?.error || "Failed to connect to the execution server"
            setOutput(`Error: ${errorMessage}`)
            toast.error(errorMessage)
        } finally {
            setIsRunning(false)
            toast.dismiss(toastId)
        }
    }

    return (
        <RunCodeContext.Provider value={{ setInput, output, isRunning, supportedLanguages, selectedLanguage, setSelectedLanguage, runCode }}>
            {children}
        </RunCodeContext.Provider>
    )
}

export { RunCodeContextProvider }
export default RunCodeContext
