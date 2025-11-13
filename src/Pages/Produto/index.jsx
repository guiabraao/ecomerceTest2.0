import './styles.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Router, Routes, Route, useParams } from "react-router-dom";
import axios from 'axios'
import Header from '../../Components/Header'
import Cart from '../../assets/whiteCart.svg'
import CarrosselLancamentos from '../../Components/CarrosselLancamentos'
import Footer from '../../Components/Footer';

export default function Produto() {

    const { id, tipo } = useParams();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/produto/${tipo}/${id}`)
            .then(res => setProduto(res.data))
            .catch(err => console.error("Erro ao carregar produto:", err))
    }, [tipo, id])

    if (!produto) {
        return <p>Carregando produto...</p>;
    }

    return (
        <>
            <Header />

            <main>

                <div className="containerProduto">
                    <div className="boxProduto">

                        <div className="imgsProduto">
                            <img src={produto.imagem} alt="" />
                        </div>

                        <div className="produtoInfos">
                            <div className="produtoCategorias">
                                <h4>{produto.produto}</h4>
                                <h4>{produto.filtro}</h4>
                            </div>
                            <h1>{produto.nome}</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh neque, mollis cursus felis vitae, luctus scelerisque elit. Phasellus luctus dignissim arcu vel auctor. Duis rutrum, lectus eu faucibus hendrerit, libero elit consequat sem, at euismod sapien ante ac justo.</p>
                            <div className="boxPrices">
                                <p className="precoProduto">R${produto.preco}</p>
                            </div>
                            <div className="boxSizes">
                                <h4>Tamanhos:</h4>
                                <div className="size">
                                    <div className="sizeItem">
                                        <h3>39</h3>
                                    </div>
                                    <div className="sizeItem">
                                        <h3>40</h3>
                                    </div>
                                    <div className="sizeItem">
                                        <h3>41</h3>
                                    </div>
                                    <div className="sizeItem">
                                        <h3>42</h3>
                                    </div>
                                    <div className="sizeItem">
                                        <h3>43</h3>
                                    </div>
                                    <div className="sizeItem">
                                        <h3>44</h3>
                                    </div>
                                </div>
                            </div>
                            <button className="btnCarrinho">
                                Adicionar ao Carrinho
                                <img src={Cart} alt="" />
                            </button>
                        </div>
                    </div>

                    <CarrosselLancamentos />

                </div>

                <Footer />
            </main>
        </>
    )
}