import './styles.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { useState } from 'react'
import Logo from '../../assets/whiteLogo.png'
import authServices from '../services/auth.jsx'
import { useNavigate } from 'react-router-dom'

export default function Cadastros() {

    const { login, singup } = authServices()

    const [loginData, setLoginData] = useState({
        emailLogIn: '',
        passwordLogIn: '',
        role: 'user'
    })

    const [cadastroData, setCadastroData] = useState({
        nameSingUp: '',
        emailSingUp: '',
        passwordSingUp: '',
        role: 'user'
    })
    
    const [isCadastro, setIsCadastro] = useState(false)

    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginData(prev => ({ ...prev, [name]: value }))
    }

    const handleCadastroChange = (e) => {
        const { name, value } = e.target
        setCadastroData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (isCadastro) {
            console.log('Cadastrando: ', cadastroData)
            const result = await singup(cadastroData)
            if (result.success) {
                alert('Usuário cadastrado com sucesso!')
                setIsCadastro(false)
                useNavigate('/')
            } else {
                alert(result.body?.text || 'Erro ao cadastrar!')
            }
            cadastroData.emailSingUp = ''
            cadastroData.nameSingUp = ''
            cadastroData.passwordSingUp = ''
        } else {
            console.log('Logando: ', loginData)
            const result = await login(loginData)
            if (result.success) {
                alert('Login realizado com sucesso!')
                localStorage.setItem('token', result.body.token)
                localStorage.setItem('user', JSON.stringify(result.body.user))
                useNavigate('/')
            } else {
                alert(result.body?.text || 'Erro ao fazer login!')
            }
            loginData.emailLogIn = ''
            loginData.passwordLogIn = ''
        }
    }

    const toggleNav = () => {
        setIsCadastro(!isCadastro)
        cadastroData.emailSingUp = ''
        cadastroData.nameSingUp = ''
        cadastroData.passwordSingUp = ''
        loginData.emailLogIn = ''
        loginData.passwordLogIn = ''
    }

    return (
        <>
            <Header />

            <main>

                <div className="containerCadastros">
                    <div className={`boxCadastros ${isCadastro ? 'active' : ''}`}>
                        <div className="form-box">
                            {isCadastro ? (
                                <>
                                    <form className='formSingUp' onSubmit={handleSubmitForm}>
                                        <h2>Cadastrar</h2>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nome"
                                            name='nameSingUp'
                                            value={cadastroData.nameSingUp}
                                            onChange={handleCadastroChange}
                                        />
                                        <input
                                            required
                                            type="email"
                                            placeholder="Email"
                                            name='emailSingUp'
                                            value={cadastroData.emailSingUp}
                                            onChange={handleCadastroChange}
                                        />
                                        <input
                                            required
                                            type="password"
                                            placeholder="Senha"
                                            name='passwordSingUp'
                                            value={cadastroData.passwordSingUp}
                                            onChange={handleCadastroChange}
                                        />
                                        <select name='role' value={cadastroData.role} onChange={handleCadastroChange}>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button type='submit'>Criar conta</button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <form className='formLogIn' onSubmit={handleSubmitForm}>
                                        <h2>Entrar</h2>
                                        <input
                                            required
                                            type="email"
                                            placeholder="Email"
                                            name='emailLogIn'
                                            value={loginData.emailLogIn}
                                            onChange={handleLoginChange}
                                        />
                                        <input
                                            required
                                            type="password"
                                            placeholder="Senha"
                                            name='passwordLogIn'
                                            value={loginData.passwordLogIn}
                                            onChange={handleLoginChange}
                                        />
                                        <select name='role' value={loginData.role} onChange={handleLoginChange}>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button type='submit'>Entrar</button>
                                    </form>
                                </>
                            )}
                        </div>

                        <div className="sideLogin">
                            <div className="side-box">
                                {isCadastro ? (
                                    <>
                                        <img src={Logo} alt="" />
                                        <h3>Já tem conta?</h3>
                                        <p>Faça login para continuar!</p>
                                        <button onClick={toggleNav}>Entrar</button>
                                    </>
                                ) : (
                                    <>
                                        <img src={Logo} alt="" />
                                        <h3>Não tem conta?</h3>
                                        <p>Crie uma conta para começar!</p>
                                        <button onClick={toggleNav}>Cadastrar</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}