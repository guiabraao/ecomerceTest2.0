import './styles.css'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import Header from '../../Components/Header'
import Cart from '../../assets/whiteCart.svg'
import CarrosselLancamentos from '../../Components/CarrosselLancamentos'
import Footer from '../../Components/Footer'
import { adicionarAoCarrinho } from '../../utils/carrinho'

export default function Produto() {

    const { id, tipo } = useParams();
    const [produto, setProduto] = useState(null);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null); // <-- NOVO

    useEffect(() => {
        axios.get(`https://ecomercebacktest.onrender.com/produto/${tipo}/${id}`)
            .then(res => {
                const data = res.data;
                data.tipo = tipo; // garante que o produto saiba seu tipo
                setProduto(data);
            })
            .catch(err => console.error("Erro ao carregar produto:", err))
    }, [tipo, id]);

    useEffect(() => {
        setTamanhoSelecionado(null);
    }, [tipo, id]);

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
                                <h4>{produto.categoria}</h4>
                                <h4>{produto.filtro}</h4>
                            </div>

                            <h1>{produto.nome}</h1>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh neque,mollis cursus felis vitae, luctus scelerisque elit.</p>

                            <div className="boxPrices">
                                <p className="precoProduto">R${produto.preco}</p>
                            </div>

                            <div className="boxSizes">
                                <h4>Tamanhos:</h4>

                                <div className="size">
                                    {['39', '40', '41', '42', '43', '44'].map(tamanho => (
                                        <div
                                            key={tamanho}
                                            className={`sizeItem ${tamanhoSelecionado === tamanho ? 'selecionado' : ''
                                                }`}
                                            onClick={() => setTamanhoSelecionado(tamanho)}
                                        >
                                            <h3>{tamanho}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="btnCarrinho"
                                onClick={() => {
                                    if (!tamanhoSelecionado) {
                                        alert("Por favor, selecione um tamanho.");
                                        return;
                                    }

                                    adicionarAoCarrinho(produto, tamanhoSelecionado, 1);
                                }}
                            >
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
    );
}
