import { useState, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark"
    })

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    useEffect(() => {
        document.body.classList.remove("light", "dark")
        document.body.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
