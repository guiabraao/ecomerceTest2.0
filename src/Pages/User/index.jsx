import './styles.css'
import Header from '../../Components/Header'
import Profile from '../../assets/profile.svg'
import Box from '../../assets/box.svg'
import Exit from '../../assets/exit.svg'
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

export default function User() {

    // const authData = JSON.parse(localStorage.getItem('auth'))
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!authData) {
    //         return navigate('/auth')
    //     }
    // }, [])

    return (
        <>
            <Header />

            <main>
                <div className="containerUsuario">
                    <div className="boxUser">
                        <div className="userContent">
                            <div className="userLeft">
                                <div className="boxUserTop">
                                    <div className="boxtop">
                                        <img src={Profile} alt="" />
                                        <h2>Olá, Usuario(a)</h2>
                                    </div>
                                    <div className="boxSair">
                                        <img src={Exit} alt="" />
                                        <p>Sair da conta</p>
                                    </div>
                                </div>
                                <div className="boxPedidos">
                                    <img src={Box} alt="" />
                                    <p><span>Meus pedidos</span></p>
                                </div>
                                <div className="boxPedidos">
                                    <img src={Profile} alt="" />
                                    <p><span>Dados Cadastrais</span></p>
                                </div>
                            </div>

                            <div className="contentUser">
                                <h2>Meus pedidos</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}