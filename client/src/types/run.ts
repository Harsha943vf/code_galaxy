interface Language {
    language: string
    // OneCompiler doesn't strictly require versions for most languages, 
    // so we make it optional to maintain compatibility with your previous code.
    version?: string 
    aliases: string[]
}

interface RunContext {
    setInput: (input: string) => void
    output: string
    isRunning: boolean
    supportedLanguages: Language[]
    selectedLanguage: Language
    setSelectedLanguage: (language: Language) => void
    runCode: () => void
}

export { type Language, type RunContext }