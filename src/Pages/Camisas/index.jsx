import './styles.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Logo from '../../assets/logo.png'
import Pl from '../../assets/pl.png'
import LaLiga from '../../assets/laliga.png'
import Brasileirao from '../../assets/brasileirao.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CamisasPage() {

    const [camisas, setCamisas] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/camisa')
            .then(response => setCamisas(response.data.body))
            .catch(error => console.error("Erro ao buscar camisas", error))
    }, [])

    return (
        <>
            < Header />

            <main>

                <div className="mainCamisasPage">
                    <div className="containerCamisasPage">

                        <div className="boxFilterChuteiras">
                            <div className="logoBoxFilter"><img src={Logo} alt="" /></div>
                            <div className="boxBrand">
                                <h2>Marcas:</h2>
                                <ul className="filterBrand">
                                    <li><img src={Pl} alt="" /></li>
                                    <li><img src={LaLiga} alt="" /></li>
                                    <li><img src={Brasileirao} alt="" /></li>
                                </ul>
                            </div>
                            <div className="boxSizesCamisasPage">
                                <h2>Tamanhos:</h2>
                                <ul className="filterSize">
                                    <li><span>P</span></li>
                                    <li><span>M</span></li>
                                    <li><span>G</span></li>
                                    <li><span>GG</span></li>
                                    <li><span>GGG</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="containerProdutos">

                            <div className="boxTopProdutos">
                                <h1>Camisas</h1>
                                <select>
                                    <option value="1">Mais Vendidos</option>
                                    <option value="2">Preço: Maior ao Menor</option>
                                    <option value="3">Preço: Menor ao Maior</option>
                                    <option value="4">Lançamentos</option>
                                </select>
                            </div>

                            <div className="produtosList">
                                {camisas.map((item, id) => (
                                    <Link to={`/produto/camisas/${item._id}`} key={item._id} className='link'>
                                        <div className="cardLancamentos" key={id}>
                                            <div className="cardLancamentosTop">
                                                <img src={item.imagem} alt="" />
                                            </div>
                                            <div className="contentCardLancamentos">
                                                <h3>{item.filtro}</h3>
                                                <h2>{item.nome}</h2>
                                                <p>{item.preco}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>

        </>
    )
}