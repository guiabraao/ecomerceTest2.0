import './styles.css'
import Header from '../../Components/Header'
import Logo from '../../assets/logo.png'
import Nike from '../../assets/nike.png'
import Adidas from '../../assets/adidas.png'
import Puma from '../../assets/puma.png'
import { useEffect, useState } from 'react'
import Close from '../../assets/close.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import Seta from '../../assets/seta.svg'

export default function ChuteirasPage() {

    const [chuteiras, setChuteiras] = useState([])
    const [expanded, setExpanded] = useState(false)

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/chuteira')
            .then(response => setChuteiras(response.data.body))
            .catch(error => console.error("Erro ao buscar chuteiras", error))
    }, [])

    return (
        <>
            < Header />

            <main>

                <div className="mainChuteirasPage">
                    <div className="containerChuteirasPage">

                        <div className="boxFilterChuteiras">
                            <div className="logoBoxFilter"><img src={Logo} alt="" /></div>
                            <div className="boxBrand">
                                <h2>Marcas:</h2>
                                <ul className="filterBrand">
                                    <li><img src={Nike} alt="" /></li>
                                    <li><img src={Adidas} alt="" /></li>
                                    <li><img src={Puma} alt="" /></li>
                                </ul>
                            </div>
                            <div className="boxSizesChuteirasPage">
                                <h2>Tamanhos:</h2>
                                <ul className="filterSize">
                                    <li><span>39</span></li>
                                    <li><span>40</span></li>
                                    <li><span>41</span></li>
                                    <li><span>42</span></li>
                                    <li><span>43</span></li>
                                    <li><span>44</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="containerProdutos">

                            <div className="boxIconFilterMobile" onClick={toggleNav}>
                                <p>Filtros</p>
                                <img src={Seta} alt="" />
                                {expanded && (
                                    <div className="boxFilterMobile">
                                        <div className="filterMobileTop">
                                            <h4>Filtros</h4>
                                            <div className="boxCloseFilter" onClick={toggleNav}>
                                                <p>Fechar</p>
                                                <img src={Close} alt="" />
                                            </div>
                                        </div>
                                        <div className="boxBrandMobile">
                                            <h2>Marcas:</h2>
                                            <ul className="filterBrandMobile">
                                                <li><img src={Nike} alt="" /></li>
                                                <li><img src={Adidas} alt="" /></li>
                                                <li><img src={Puma} alt="" /></li>
                                            </ul>
                                        </div>
                                        <div className="boxSizesChuteirasPageMobile">
                                            <h2>Tamanhos:</h2>
                                            <ul className="filterSize">
                                                <li><span>39</span></li>
                                                <li><span>40</span></li>
                                                <li><span>41</span></li>
                                                <li><span>42</span></li>
                                                <li><span>43</span></li>
                                                <li><span>44</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="boxTopProdutos">
                                <h1>Chuteiras</h1>
                                <select>
                                    <option value="1">Mais Vendidos</option>
                                    <option value="2">Preço: Maior ao Menor</option>
                                    <option value="3">Preço: Menor ao Maior</option>
                                    <option value="4">Lançamentos</option>
                                </select>
                            </div>

                            <div className="produtosList">
                                {chuteiras.map((item, id) => (
                                    <Link to={`/produto/chuteiras/${item._id}`} key={item._id} className='link'>
                                        <div className="cardLancamentos" key={id}>
                                            <div className="cardLancamentosTop">
                                                <img src={item.imagem} alt="" />
                                            </div>
                                            <div className="contentCardLancamentos">
                                                <h3>{item.filtro}</h3>
                                                <h2>{item.nome}</h2>
                                                <p>R$ {item.preco}</p>
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