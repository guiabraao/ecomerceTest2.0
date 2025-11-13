import './styles.css'
import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import CarrosselLancamentos from '../../Components/CarrosselLancamentos'
import Carrossel1 from '../../assets/1.jpg'
import Carrossel2 from '../../assets/2.jpg'
import Carrossel3 from '../../assets/3.jpg'
import Banner1 from '../../assets/bannerChuteiras.png'
import Banner2 from '../../assets/bannerCamisas.png'
import { Link } from 'react-router-dom'

export default function Home() {

    const bannerCarrossel = [
        { id: 1, image: Carrossel1 },
        { id: 2, image: Carrossel2 },
        { id: 3, image: Carrossel3 }
    ]

    const [currentCarrossel, setCurrentCarrossel] = useState(0);
    const [direction, setDirection] = useState(0);
    const timeoutRef = useRef(null)

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentCarrossel((prev) =>
            newDirection === 1
                ? (prev + 1) % bannerCarrossel.length
                : (prev - 1 + bannerCarrossel.length) % bannerCarrossel.length
        );
    };

    const variantsInertia = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        }),
    };


    return (
        <>
            <Header />

            <main>
                <div className="mainHome">

                    <div className="containerHome">

                        <div className="carrossel">
                            <AnimatePresence mode='wait' custom={direction}>
                                <motion.img
                                    key={bannerCarrossel[currentCarrossel].id}
                                    src={bannerCarrossel[currentCarrossel].image}
                                    className='boxCarrosselHome'
                                    custom={direction}
                                    variants={variantsInertia}
                                    initial='enter'
                                    animate='center'
                                    exit="exit"
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = Math.abs(offset.x) * velocity.x;
                                        if (swipe < -1000) {
                                            paginate(1);
                                        } else if (swipe > 1000) {
                                            paginate(-1);
                                        }
                                    }}
                                />
                            </AnimatePresence>
                        </div>

                        <div className="boxIntroHome">
                            <div className="boxBannerIntro">
                                <div className="bannerBox">
                                    <img src={Banner1} alt="" />
                                    <div className="bannerContent">
                                        <Link to='/chuteiras' className='link'><button>CONFIRA</button></Link>
                                    </div>
                                </div>
                                <div className="bannerBox">
                                    <img src={Banner2} alt="" />
                                    <div className="bannerContent">
                                        <Link to='/camisas' className='link'><button>SHOP NOW</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CarrosselLancamentos />
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}