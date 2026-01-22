import './styles.css'
import { useState } from 'react'
import Close from '../../assets/close.svg'
import Cart from '../../assets/cart.svg'
import Camisa from '../../assets/camisaTest.png'
import { getCarrinho, removerDoCarrinho, alterarQuantidade, totalCarrinho } from "../../utils/carrinho.js";
import { useEffect, useState } from 'react';

export default function Carrinho() {

    const [expanded, setExpanded] = useState(false);

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    const [itens, setItens] = useState([]);

    useEffect(() => {
        setItens(getCarrinho());
    }, []);

    const atualizarQtd = (id, tamanho, valor) => {
        alterarQuantidade(id, tamanho, valor);
        setItens(getCarrinho());
    };

    const removerItem = (id, tamanho) => {
        removerDoCarrinho(id, tamanho);
        setItens(getCarrinho());
    };

    return (
        <>
            <div className="containerCarrinho">

                <div className="carrinhoBox">

                    <div className="carrinhoTop">
                        <div className="carrinhoLeftTop">
                            <img src={Cart} alt="" />
                            <p>Meu carrinho</p>
                        </div>
                        <div className="carrinhoRightTop">
                            <img src={Close} alt="" />
                            <p>Fechar</p>
                        </div>
                    </div>

                    <div className="carrinhoContent">

                        {itens.map(item => (
                            <div className="carrinhoItem" key={item.id + item.tamanho}>
                                <div className="itemStart">
                                    <img src={item.imagem} alt="" />
                                    <div className="itemDetails">
                                        <h2>{item.nome}</h2>
                                        <p>Tamanho: {item.tamanho}</p>
                                    </div>
                                </div>

                                <div className="itemQuant">
                                    <button onClick={() => atualizarQtd(item.id, item.tamanho, item.quantidade - 1)}>-</button>
                                    <p>{item.quantidade}</p>
                                    <button onClick={() => atualizarQtd(item.id, item.tamanho, item.quantidade + 1)}>+</button>
                                    <h3 onClick={() => removerItem(item.id, item.tamanho)}>Remover</h3>
                                </div>

                                <div className="itemPrice">
                                    <h2>R$ {(item.preco * item.quantidade).toFixed(2)}</h2>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="carrinhoBottom">
                        <div className="valorTotal">
                            <p>Valor total</p>
                            <h2><h2>R$ {totalCarrinho().toFixed(2)}</h2></h2>
                        </div>
                        <button>Finalizar Compra</button>
                    </div>
                </div>

            </div>
        </>
    )
}