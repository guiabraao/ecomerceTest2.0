import './styles.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Camisa from '../../assets/camisaTest.png'
import Logo from '../../assets/whiteLogo.png'
import Chuteira from '../../assets/chuteira.svg'
import CamisaSvg from '../../assets/camisa.svg'
import Close from '../../assets/closeW.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Estoque() {

    const [expanded, setExpanded] = useState(null)
    const [expandedEdit, setExpandedEdit] = useState(null)

    const toggleNav = (id) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    const [chuteiras, setChuteiras] = useState([])
    const [camisas, setCamisas] = useState([])
    const [selectedEstoque, setSelectedEstoque] = useState('Camisas')
    const [formEdicao, setFormEdicao] = useState({
        nome: "",
        categoria: "",
        filtro: "",
        preco: "",
        imagem: "",
        available: "true"
    });

    const toggleNavEdit = (item) => {
        setExpandedEdit(prev => prev === item._id ? null : item._id);

        setFormEdicao({
            _id: item._id,
            nome: item.nome,
            categoria: item.categoria,
            filtro: item.filtro,
            preco: item.preco,
            imagem: item.imagem,
            available: item.available ? "true" : "false",
        });
    };

    const estoqueData = {
        Camisas: {
            img: CamisaSvg,
            titulo: 'Camisas',
        },
        Chuteiras: {
            img: Chuteira,
            titulo: 'Chuteiras',
        }
    };

    useEffect(() => {
        axios.get('https://ecomercebacktest.onrender.com/chuteira')
            .then(response => setChuteiras(response.data.body))
            .catch(error => console.error("Erro ao buscar chuteiras", error))

        axios.get('https://ecomercebacktest.onrender.com/camisa')
            .then(response => setCamisas(response.data.body))
            .catch(error => console.error("Erro ao buscar camisas", error))
    }, []);

    const estoqueAtual = selectedEstoque === "Camisas" ? camisas : chuteiras;

    const handleDeleteCamisa = async (id) => {
        try {
            const res = await fetch(`https://ecomercebacktest.onrender.com/camisa/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error("Erro ao deletar camisa");
            }

            setCamisas((prev) => prev.filter(item => item._id !== id));

            console.log("Camisa deletada com sucesso!");

        } catch (error) {
            console.error("Erro no DELETE:", error);
        }
    };

    const handleEditCamisa = async (id, formEdicao) => {
        try {
            const { _id, ...dados } = formEdicao;

            const res = await fetch(`https://ecomercebacktest.onrender.com/camisa/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            if (!res.ok) {
                throw new Error("Erro ao editar camisa");
            }

            const updated = await res.json();

            setCamisas((prev) =>
                prev.map(item => (item._id === id ? updated.body : item))
            );

            alert("Camisa editada com sucesso!");

        } catch (error) {
            console.error("Erro no PUT:", error);
        }
    };

    const handleDeleteChuteira = async (id) => {
        try {
            const res = await fetch(`https://ecomercebacktest.onrender.com/chuteira/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error("Erro ao deletar chuteira");
            }

            setChuteiras((prev) => prev.filter(item => item._id !== id));

            alert("Chuteira deletada com sucesso!");

        } catch (error) {
            console.error("Erro no DELETE:", error);
        }
    };

    const handleEditChuteira = async (id, formEdicao) => {
        try {
            const { _id, ...dados } = formEdicao;

            const res = await fetch(`https://ecomercebacktest.onrender.com/chuteira/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            if (!res.ok) {
                throw new Error("Erro ao editar chuteira");
            }

            const updated = await res.json();

            setChuteiras((prev) =>
                prev.map(item => (item._id === id ? updated.body : item))
            );

            alert("chuteira editada com sucesso!");

        } catch (error) {
            console.error("Erro no PUT:", error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setFormEdicao(prev => ({ ...prev, [name]: value }))
    }


    return (
        <>
            <Header />
            <main>
                <div className="containerEstoque">
                    <div className="boxEstoque">
                        <div className="produtosTypes">
                            <img src={Logo} alt="" />
                            <h1>{estoqueData[selectedEstoque].titulo}</h1>
                            <div className="estoqueType">
                                <h3>Estoque dos Produtos:</h3>
                                <ul>
                                    {Object.keys(estoqueData).map((key) => (
                                        <div
                                            key={key}
                                            className='estoqueTypeItem'
                                            onClick={() => setSelectedEstoque(key)}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <div className='boxAnimationIcon'>
                                                <img src={estoqueData[key].img} alt="" />
                                            </div>
                                            <p>{estoqueData[key].titulo}</p>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="produtosTypesMobile">
                            <div className="imgProdutosMob"><img src={Logo} alt="" /></div>
                            <h1>{estoqueData[selectedEstoque].titulo}</h1>
                            <div className="estoqueTypeMobile">
                                <ul>
                                    {Object.keys(estoqueData).map((key) => (
                                        <div
                                            key={key}
                                            className='estoqueTypeItem'
                                            onClick={() => setSelectedEstoque(key)}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <div className='boxAnimationIcon'>
                                                <img src={estoqueData[key].img} alt="" />
                                            </div>
                                            <p>{estoqueData[key].titulo}</p>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Marca</th>
                                    <th>Categoria</th>
                                    <th>Preço</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {estoqueAtual.map((item) => (
                                    <tr key={item._id} className='itemPadrao'>
                                        <td><img src={item.imagem} alt="" /></td>
                                        <td className='editProduct'>
                                            <div className="contentItemPadrao">
                                                <td>{item.nome}</td>
                                                <td>{item.filtro}</td>
                                                <td>{item.categoria}</td>
                                                <td>R$ {item.preco}</td>
                                            </div>
                                            <button className='btnEditar' onClick={() => {
                                                setExpandedEdit(item._id);
                                                setFormEdicao({
                                                    _id: item._id,
                                                    nome: item.nome,
                                                    categoria: item.categoria,
                                                    filtro: item.filtro,
                                                    preco: item.preco,
                                                    imagem: item.imagem,
                                                    available: item.available ? "true" : "false"
                                                });
                                            }}>
                                                Editar
                                            </button>

                                            {expandedEdit === item._id && (
                                                <div className="modalEdit">
                                                    <div className="boxModalEdit">
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            selectedEstoque === "Camisas"
                                                                ? handleEditCamisa(formEdicao._id, formEdicao)
                                                                : handleEditChuteira(formEdicao._id, formEdicao);
                                                        }}>
                                                            <div className="boxCloseEdit" onClick={() => setExpandedEdit(null)}><img src={Close} alt="" /></div>
                                                            <h2>Editar Produto</h2>
                                                            <label>
                                                                <p>Nome:</p>
                                                                <input
                                                                    type="text"
                                                                    name="nome"
                                                                    value={formEdicao.nome}
                                                                    onChange={handleEditChange}
                                                                    required
                                                                />
                                                            </label>
                                                            <label>
                                                                <p>Categoria:</p>
                                                                <input
                                                                    type="text"
                                                                    name="categoria"
                                                                    value={formEdicao.categoria}
                                                                    onChange={handleEditChange}
                                                                    required
                                                                />
                                                            </label>
                                                            <label>
                                                                <p>Filtro:</p>
                                                                <input
                                                                    type="text"
                                                                    name="filtro"
                                                                    value={formEdicao.filtro}
                                                                    onChange={handleEditChange}
                                                                />
                                                            </label>
                                                            <label>
                                                                <p>Preço:</p>
                                                                <input
                                                                    type="number"
                                                                    name="preco"
                                                                    value={formEdicao.preco}
                                                                    onChange={handleEditChange}
                                                                    required
                                                                />
                                                            </label>
                                                            <label>
                                                                <p>Imagem (URL):</p>
                                                                <input
                                                                    type="text"
                                                                    name="imagem"
                                                                    value={formEdicao.imagem}
                                                                    onChange={handleEditChange}
                                                                />
                                                            </label>
                                                            <label>
                                                                <p>Available:</p>
                                                                <select
                                                                    name="available"
                                                                    value={formEdicao.available}
                                                                    onChange={handleEditChange}
                                                                >
                                                                    <option value="true">YES</option>
                                                                    <option value="false">NO</option>
                                                                </select>
                                                            </label>
                                                            <button type="submit">Atualizar</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}

                                            <button className='btnExcluir' onClick={() => toggleNav(item._id)}>Excluir</button>
                                            {expanded === item._id && (
                                                <div className="modalExcluir">
                                                    <div className="boxModal">
                                                        <div className="modalTop">
                                                            <h2>Excluir Produto</h2>
                                                            <p>Você dejesa excluir esse produto?</p>
                                                            <p>{item.nome}</p>
                                                            <img src={Close} alt="" onClick={toggleNav} />
                                                        </div>
                                                        <div className="modalContent">
                                                            <img src={item.imagem} alt="" />
                                                        </div>
                                                        <div className="btnsModal">
                                                            <button className="btnExcluirModal" onClick={() =>
                                                                selectedEstoque === "Camisas"
                                                                    ? handleDeleteCamisa(item._id)
                                                                    : handleDeleteChuteira(item._id)
                                                            }>Excluir</button>
                                                            <button className="btnNaoModal" onClick={toggleNav}>Cancelar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {/* {estoqueAtual.map((item) => (
                                    <tr key={item._id} className='itemMobile'>
                                        <div className="itemMobileTop">
                                            <td><img src={item.imagem} alt="" /></td>
                                            <div className="itemMobileTopRight">
                                                <td>{item.nome}</td>
                                                <td>{item.filtro}</td>
                                                <td>{item.categoria}</td>
                                            </div>
                                        </div>
                                        <div className="itemMobileBottom">
                                            <div className="preco"><td>R$ {item.preco}</td></div>
                                            <td className='editProduct'>
                                                <button className='btnEditar' onClick={() => {
                                                    setExpandedEdit(item._id);
                                                    setFormEdicao({
                                                        _id: item._id,
                                                        nome: item.nome,
                                                        categoria: item.categoria,
                                                        filtro: item.filtro,
                                                        preco: item.preco,
                                                        imagem: item.imagem,
                                                        available: item.available ? "true" : "false"
                                                    });
                                                }}>
                                                    Editar
                                                </button>

                                                {expandedEdit === item._id && (
                                                    <div className="modalEdit">
                                                        <div className="boxModalEdit">
                                                            <form onSubmit={(e) => {
                                                                e.preventDefault();
                                                                selectedEstoque === "Camisas"
                                                                    ? handleEditCamisa(formEdicao._id, formEdicao)
                                                                    : handleEditChuteira(formEdicao._id, formEdicao);
                                                            }}>
                                                                <div className="boxCloseEdit" onClick={() => setExpandedEdit(null)}><img src={Close} alt="" /></div>
                                                                <h2>Editar Produto</h2>
                                                                <label>
                                                                    <p>Nome:</p>
                                                                    <input
                                                                        type="text"
                                                                        name="nome"
                                                                        value={formEdicao.nome}
                                                                        onChange={handleEditChange}
                                                                        required
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <p>Categoria:</p>
                                                                    <input
                                                                        type="text"
                                                                        name="categoria"
                                                                        value={formEdicao.categoria}
                                                                        onChange={handleEditChange}
                                                                        required
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <p>Filtro:</p>
                                                                    <input
                                                                        type="text"
                                                                        name="filtro"
                                                                        value={formEdicao.filtro}
                                                                        onChange={handleEditChange}
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <p>Preço:</p>
                                                                    <input
                                                                        type="number"
                                                                        name="preco"
                                                                        value={formEdicao.preco}
                                                                        onChange={handleEditChange}
                                                                        required
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <p>Imagem (URL):</p>
                                                                    <input
                                                                        type="text"
                                                                        name="imagem"
                                                                        value={formEdicao.imagem}
                                                                        onChange={handleEditChange}
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <p>Available:</p>
                                                                    <select
                                                                        name="available"
                                                                        value={formEdicao.available}
                                                                        onChange={handleEditChange}
                                                                    >
                                                                        <option value="true">YES</option>
                                                                        <option value="false">NO</option>
                                                                    </select>
                                                                </label>
                                                                <button type="submit">Atualizar</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                )}

                                                <button className='btnExcluir' onClick={() => toggleNav(item._id)}>Excluir</button>
                                                {expanded === item._id && (
                                                    <div className="modalExcluir">
                                                        <div className="boxModal">
                                                            <div className="modalTop">
                                                                <p>Você dejesa excluir esse produto?</p>
                                                                <img src={Close} alt="" onClick={toggleNav} />
                                                            </div>
                                                            <div className="modalContent">
                                                                <img src={item.imagem} alt="" />
                                                            </div>
                                                            <div className="btnsModal">
                                                                <button className="btnExcluir" onClick={() =>
                                                                    selectedEstoque === "Camisas"
                                                                        ? handleDeleteCamisa(item._id)
                                                                        : handleDeleteChuteira(item._id)
                                                                }>Sim</button>
                                                                <button className="btnNaoModal" onClick={toggleNav}>Não</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </div>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}