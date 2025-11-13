import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    const login = (userData) => {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('user', JSON.stringify(userData.user))
        setUser(userData.user)
  }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)