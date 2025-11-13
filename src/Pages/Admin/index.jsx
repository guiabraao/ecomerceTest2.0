import './styles.css'
import Header from '../../Components/Header'
import WhiteBox from '../../assets/whiteBox.svg'
import Chuteira from '../../assets/chuteira.svg'
import WhiteProfile from '../../assets/whiteProfile.svg'
import Close from '../../assets/close.svg'
import Camisa from '../../assets/camisa.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {

    const [camisaExpanded, setCamisaExpanded] = useState(false)
    const [chuteiraExpanded, setChuteiraExpanded] = useState(false)

    const toggleNavCamisa = () => {
        setCamisaExpanded(!camisaExpanded)
    }
    const toggleNavChuteira = () => {
        setChuteiraExpanded(!chuteiraExpanded)
    }

    const [novaCamisa, setNovaCamisa] = useState({
        nome: "",
        categoria: "",
        filtro: "",
        preco: "",
        imagem: "",
        available: "true"
    })

    const handleChangeCamisa = (e) => {
        const { name, value } = e.target
        setNovaCamisa({ ...novaCamisa, [name]: value })
    }

    const handleSubmitCamisa = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/camisa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...novaCamisa,
                    preco: parseFloat(novaCamisa.preco),
                    available: novaCamisa.available === "true"
                }),
            })

            if (response.ok) {
                alert("Camisa adicionada com sucesso!")
                setNovaCamisa({
                    nome: "",
                    categoria: "",
                    filtro: "",
                    preco: "",
                    imagem: "",
                    available: "true"
                })
                toggleNavCamisa()
            } else {
                alert("Erro ao adicionar camisa")
            }
        } catch (error) {
            console.error("Erro:", error)
            alert("Erro de conexão com o servidor.")
        }
    }

    const [novaChuteira, setNovaChuteira] = useState({
        nome: "",
        categoria: "",
        filtro: "",
        preco: "",
        imagem: "",
        available: "true"
    })

    const handleChangeChuteira = (e) => {
        const { name, value } = e.target
        setNovaChuteira({ ...novaChuteira, [name]: value })
    }

    const handleSubmitChuteira = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/chuteira", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...novaChuteira,
                    preco: parseFloat(novaChuteira.preco),
                    available: novaChuteira.available === "true"
                }),
            })

            if (response.ok) {
                alert("Chuteira adicionada com sucesso!")
                setNovaChuteira({
                    nome: "",
                    categoria: "",
                    filtro: "",
                    preco: "",
                    imagem: "",
                    available: "true"
                })
                toggleNavChuteira()
            } else {
                alert("Erro ao adicionar chuteira")
            }
        } catch (error) {
            console.error("Erro:", error)
            alert("Erro de conexão com o servidor.")
        }
    }


    return (
        <>
            <Header />

            <main className='mainAdmin'>

                <div className="containerAdmin">
                    <div className="txtAdmin">
                        <h2>Bem vindo, Admin <span>Usuário(a)</span>!</h2>
                        <h1>Menu de <span>gerenciamento</span></h1>
                    </div>

                    <div className="boxMenuAdmin">
                        <div className="adminItem">
                            <img src={WhiteProfile} alt="" />
                            <p>Meus Dados</p>
                        </div>
                        <Link to='/estoque' className='link'>
                            <div className="adminItem">
                                <img src={WhiteBox} alt="" />
                                <p>Gerenciar Pedidos</p>
                            </div>
                        </Link>
                        <div className="adminItem" onClick={toggleNavCamisa}>
                            <img src={Camisa} alt="" />
                            <p>Adicionar Camisa</p>
                        </div>
                        <div className="adminItem" onClick={toggleNavChuteira}>
                            <img src={Chuteira} alt="" />
                            <p>Adicionar Chuteira</p>
                        </div>
                    </div>
                </div>
                {camisaExpanded && (
                    <div className="containerFormCamisas">
                        <div className="containerFormTop">
                            <h2>Adicionar Camisa</h2>
                            <img src={Close} alt="" onClick={toggleNavCamisa} />
                        </div>
                        <div className="boxFormCamisas">
                            <form onSubmit={handleSubmitCamisa}>
                                <label>
                                    <p>Nome:</p>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={novaCamisa.nome}
                                        onChange={handleChangeCamisa}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Categoria:</p>
                                    <input
                                        type="text"
                                        name="categoria"
                                        value={novaCamisa.categoria}
                                        onChange={handleChangeCamisa}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Filtro:</p>
                                    <input
                                        type="text"
                                        name="filtro"
                                        value={novaCamisa.filtro}
                                        onChange={handleChangeCamisa}
                                    />
                                </label>
                                <label>
                                    <p>Preço:</p>
                                    <input
                                        type="number"
                                        name="preco"
                                        value={novaCamisa.preco}
                                        onChange={handleChangeCamisa}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Imagem (URL):</p>
                                    <input
                                        type="text"
                                        name="imagem"
                                        value={novaCamisa.imagem}
                                        onChange={handleChangeCamisa}
                                    />
                                </label>
                                <label>
                                    <p>Available:</p>
                                    <select
                                        name="available"
                                        value={novaCamisa.available}
                                        onChange={handleChangeCamisa}
                                    >
                                        <option value="true">YES</option>
                                        <option value="false">NO</option>
                                    </select>
                                </label>
                                <button type="submit">Adicionar</button>
                            </form>
                        </div>
                    </div>
                )}

                {chuteiraExpanded && (
                    <div className="containerFormCamisas">
                        <div className="containerFormTop">
                            <h2>Adicionar Chuteira</h2>
                            <img src={Close} alt="" onClick={toggleNavChuteira} />
                        </div>
                        <div className="boxFormCamisas">
                            <form onSubmit={handleSubmitChuteira}>
                                <label>
                                    <p>Nome:</p>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={novaChuteira.nome}
                                        onChange={handleChangeChuteira}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Categoria:</p>
                                    <input
                                        type="text"
                                        name="categoria"
                                        value={novaChuteira.categoria}
                                        onChange={handleChangeChuteira}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Filtro:</p>
                                    <input
                                        type="text"
                                        name="filtro"
                                        value={novaChuteira.filtro}
                                        onChange={handleChangeChuteira}
                                    />
                                </label>
                                <label>
                                    <p>Preço:</p>
                                    <input
                                        type="number"
                                        name="preco"
                                        value={novaChuteira.preco}
                                        onChange={handleChangeChuteira}
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Imagem (URL):</p>
                                    <input
                                        type="text"
                                        name="imagem"
                                        value={novaChuteira.imagem}
                                        onChange={handleChangeChuteira}
                                    />
                                </label>
                                <label>
                                    <p>Available:</p>
                                    <select
                                        name="available"
                                        value={novaChuteira.available}
                                        onChange={handleChangeChuteira}
                                    >
                                        <option value="true">YES</option>
                                        <option value="false">NO</option>
                                    </select>
                                </label>
                                <button type="submit">Adicionar</button>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </>
    )
}