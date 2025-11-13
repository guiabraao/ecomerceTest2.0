import './styles.css'
import { useState } from 'react'
import Close from '../../assets/close.svg'
import Cart from '../../assets/cart.svg'
import Camisa from '../../assets/camisaTest.png'

export default function Carrinho() {

    const [expanded, setExpanded] = useState(false);

    const toggleNav = () => {
        setExpanded(!expanded);
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

                        <div className="carrinhoItem">
                            <div className="itemStart">
                                <img src={Camisa} alt="" />
                                <div className="itemDetails">
                                    <h2>Camisa Longa Liverpool 25/26 - Titular</h2>
                                    <div className="itemDetailsBottom">
                                        <p>Tamanho: G</p>
                                        <p>Marca: Adidas</p>
                                    </div>
                                </div>
                            </div>
                            <div className="itemQuant">
                                <p>Qtde: 1</p>
                                <h3>Remover</h3>
                            </div>

                            <div className="itemPrice">
                                <h2>R$ 299,90</h2>
                            </div>
                        </div>

                    </div>

                    <div className="carrinhoBottom">
                        <div className="valorTotal">
                            <p>Valor total</p>
                            <h2>R$ 299,90</h2>
                        </div>
                        <button>Finalizar Compra</button>
                    </div>
                </div>

            </div>
        </>
    )
}