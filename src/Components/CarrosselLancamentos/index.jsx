import './styles.css'
import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CarrosselLancamentos() {

    const [chuteiras, setChuteiras] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/chuteira')
            .then(response => setChuteiras(response.data.body))
            .catch(error => console.error("Erro ao buscar chuteiras", error))
    }, [])

    const controls = useAnimation();
    const carouselRef = useRef(null);
    const duplicateCarrosel = [...chuteiras, ...chuteiras]

    useEffect(() => {
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: '20',
                    ease: "linear",
                }
            }
        })
    }, [controls])

    return (
        <>
            <div className="containerCarrossel">
                <h1>LANÇAMENTOS</h1>

                <div className="containerMotion">
                    <motion.div className='carrosselLancamentos' ref={carouselRef}>
                        <motion.div
                            className="innerLancamentos"
                            animate={controls}
                            onDragEnd={() => {
                                controls.start({
                                    x: -width,
                                    transition: {
                                        duration: 20,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    },
                                });
                            }}
                        >
                            {duplicateCarrosel.map((item, index) => (
                                <motion.div className="carrosselItemLancamentos" key={index}>
                                    <Link to={`/produto/chuteiras/${item.id}`} className='link'>
                                        <div className="cardLancamentos">
                                            <div className="cardLancamentosTop">
                                                <img src={item.imagem} alt="" />
                                            </div>
                                            <div className="contentCardLancamentos">
                                                <h3>{item.produto}</h3>
                                                <h2>{item.nome}</h2>
                                                <p>R$ {item.preco}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}