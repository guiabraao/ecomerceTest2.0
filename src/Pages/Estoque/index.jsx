import './styles.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Camisa from '../../assets/camisaTest.png'
import Logo from '../../assets/whiteLogo.png'

export default function Estoque() {
    return (
        <>
            <Header />

            <main>

                <div className="containerEstoque">
                    <div className="boxEstoque">
                        <div className="produtosTypes">
                            <img src={Logo} alt="" />
                            <h2>Estoque dos Produtos</h2>
                            <ul>
                                <li>Camisas</li>
                                <li>Chuteiras</li>
                            </ul>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Marca</th>
                                    <th>Available</th>
                                    <th>Preço</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={Camisa} alt="" /></td>
                                    <td>Predator Tonge Beckhamn</td>
                                    <td>Adidas</td>
                                    <td>YES</td>
                                    <td>R$: 299,00</td>
                                    <td className='editProduct'>
                                        <button className='btnEditar'>Editar</button>
                                        <button className='btnExcluir'>Excluir</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={Camisa} alt="" /></td>
                                    <td>Predator Tonge Beckhamn</td>
                                    <td>Adidas</td>
                                    <td>YES</td>
                                    <td>R$: 299,00</td>
                                    <td className='editProduct'>
                                        <button className='btnEditar'>Editar</button>
                                        <button className='btnExcluir'>Excluir</button>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td><img src={Camisa} alt="" /></td>
                                    <td>Predator Tonge Beckhamn</td>
                                    <td>Adidas</td>
                                    <td>YES</td>
                                    <td>R$: 299,00</td>
                                    <td className='editProduct'>
                                        <button className='btnEditar'>Editar</button>
                                        <button className='btnExcluir'>Excluir</button>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}