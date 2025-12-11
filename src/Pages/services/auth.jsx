import { useState } from "react";

export default function authServices() {

    const [authLoading, setAuthLoading] = useState(false)
    const API_URL = 'https://ecomercebacktest.onrender.com/auth'

    async function login(formData) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.nameSingUp,
                    email: formData.emailLogIn,
                    password: formData.passwordLogIn
                })
            })

            const result = await response.json()
            if(result.success && result.body.token){
                localStorage.setItem(
                    'auth',
                    JSON.stringify({token: result.body.token, user: result.body.user })
                )
            }
            console.log(result)
            return result
        } catch (error) {
            console.error('Erro no login:', error)
            return { success: false, error }
        }
    }

    async function singup(formData) {
        try {
            const response = await fetch(`${API_URL}/singup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.nameSingUp,
                    email: formData.emailSingUp,
                    password: formData.passwordSingUp
                })
            })

            const result = await response.json()
            console.log(result)
            return result
        } catch (error) {
            console.error('Erro no cadastro:', error)
            return { success: false, error }
        }
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        console.log('Usuário deslogado.')
    }

    return { login, singup, logout }
}