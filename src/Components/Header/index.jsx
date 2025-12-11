import './styles.css'
import { useState, useContext, useEffect } from 'react'
import Profile from '../../assets/profile.svg'
import WhiteProfile from '../../assets/whiteProfile.svg'
import whiteBox from '../../assets/whiteBox.svg'
import Cart from '../../assets/cart.svg'
import Logo from '../../assets/logo.png'
import Search from '../../assets/search.svg'
import { Link } from 'react-router-dom'
import Close from '../../assets/close.svg'
import Menu from '../../assets/menu.svg'
import { AuthContext } from '../../context/authContext'
import Plus from '../../assets/plus.svg'
import Minus from '../../assets/minus.svg'
import AOS from 'aos'
import { getCarrinho, removerDoCarrinho, alterarQuantidade, totalCarrinho } from "../../utils/carrinho.js";

export default function Header() {

    const [expanded, setExpanded] = useState(false)
    const [headerExpanded, setHeaderExpanded] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const { user, logout } = useContext(AuthContext)

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    const toggleNavHeader = () => {
        setHeaderExpanded(!headerExpanded);
    };

    const [itens, setItens] = useState([]);

    useEffect(() => {
        const atualizar = () => setItens(getCarrinho());

        atualizar();
        window.addEventListener("carrinho_atualizado", atualizar);

        return () => {
            window.addEventListener("carrinho_atualizado", atualizar);
        };
    }, []);

    const atualizarQtd = (id, tamanho, valor) => {
        alterarQuantidade(id, tamanho, valor);
        setItens(getCarrinho());
    };

    const removerItem = (id, tamanho) => {
        removerDoCarrinho(id, tamanho);
        setItens(getCarrinho());
    };

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false
        });
    }, []);

    return (
        <>
            <header >
                <div className="containerHeader">
                    <div className="headerBox">
                        <Link to="/"><div className="logoBox"><img src={Logo} alt="" data-aos="zoom-in-down" /></div></Link>
                        <nav className='navList' data-aos="zoom-in-down">
                            <ul>
                                <Link to="/chuteira" className='link'><li><span>Chuteiras</span></li></Link>
                                <Link to="/camisa" className='link'><li><span>Camisas</span></li></Link>
                                <Link to="/sobrenos" className='link'><li><span>Sobre Nós</span></li></Link>
                                <Link to="/admin" className='link'><li><span>Admin</span></li></Link>
                            </ul>
                        </nav>
                        <div className="boxIconsHeader" data-aos="zoom-in-down">

                            <div className="boxCadastro" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
                                <img src={Profile} alt="" className="profileIcon" />
                                {user ? (
                                    showInfo && (
                                        <div className="profileInfo">
                                            <div className="userInfo">
                                                <p>Olá,{user.name}!</p>
                                            </div>
                                            <div className="userMenu">
                                                <Link to='/user' className='linkProfile'>
                                                    <div className="userInfos">
                                                        <img src={WhiteProfile} alt="" />
                                                        <p>Meu perfil</p>
                                                    </div>
                                                </Link>
                                                <Link to='/pedidos' className='linkProfile'>
                                                    <div className="userInfos">
                                                        <img src={whiteBox} alt="" />
                                                        <p>Meus Pedidos</p>
                                                    </div>
                                                </Link>
                                                <button onClick={logout}>Sair</button>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    showInfo && (
                                        <div className="profileInfo">
                                            <Link to="/cadastros" className="linkProfile" onClick={() => setShowInfo(false)}>
                                                <div className="userInfos">
                                                    <img src={WhiteProfile} alt="Ícone de login" />
                                                    <p>Log-in/Sign-in</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="boxCarrinho" onClick={toggleNav}>
                                <div className="btnExpandir" onClick={toggleNav}>
                                    <img src={Cart} alt="Cart" className="cartIcon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="boxHeaderBottom">
                        <div className="boxInputSearch" data-aos="zoom-in-down">
                            <img src={Search} alt="" />
                            <input type="search" name="" id="" placeholder='Buscar' />
                        </div>
                    </div>
                </div>
            </header>
            <div className="headerMobile">
                <img src={Logo} alt="" className='logoMobile' />
                <img src={Menu} alt="" className='menuIcon' onClick={toggleNavHeader} />
            </div>
            <div className="boxHeaderBottom">
                <div className="boxInputSearch">
                    <img src={Search} alt="" />
                    <input type="search" name="" id="" placeholder='Buscar' />
                </div>
            </div>
            {headerExpanded && (
                <div className="containerHeaderMobile">
                    <div className="boxHeaderMobile">
                        <img src={Menu} alt="" className='menuIcon' onClick={toggleNavHeader} />
                        <Link to='/'><div className="boxLogoMobile"><img src={Logo} alt="" /></div></Link>
                        <nav className='navListMobile'>
                            <ul>
                                <Link to="/chuteira" className='link'><li><span>Chuteiras</span></li></Link>
                                <Link to="/camisa" className='link'><li><span>Camisas</span></li></Link>
                                <Link to="/sobrenos" className='link'><li><span>Sobre Nós</span></li></Link>
                            </ul>
                        </nav>
                        <div className="boxUserMobile">
                            <div className="boxUserItem">
                                <img src={Profile} alt="" />
                                <h2>Perfil</h2>
                            </div>
                            <div className="boxUserItem">
                                <img src={Cart} alt="" />
                                <h2>Carrinho</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {expanded && (
                <div className="containerCarrinho">

                    <div className="carrinhoBox">

                        <div className="carrinhoTop">
                            <div className="carrinhoLeftTop">
                                <img src={Cart} alt="" />
                                <p>Meu carrinho</p>
                            </div>
                            <div className="carrinhoRightTop" onClick={toggleNav}>
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
                                        <div className="quanti">
                                            <img className='minus' src={Minus} onClick={() => atualizarQtd(item.id, item.tamanho, item.tipo, item.quantidade - 1)}></img>
                                            <p>{item.quantidade}</p>
                                            <img src={Plus} onClick={() => atualizarQtd(item.id, item.tamanho, item.tipo, item.quantidade + 1)}></img>
                                        </div>
                                        <div className="itemExcluir">
                                            <h3 onClick={() => removerItem(item.id, item.tamanho, item.tipo)}>Remover</h3>
                                        </div>
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
                                <h2>R$ {totalCarrinho().toFixed(2)}</h2>
                            </div>
                            <button>Finalizar Compra</button>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}