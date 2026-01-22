import './styles.css'
import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import CarrosselLancamentos from '../../Components/CarrosselLancamentos'
import Carrossel1 from '../../assets/1.png'
import Carrossel2 from '../../assets/2.png'
import Carrossel3 from '../../assets/3.png'
import CarrosselMobile1 from '../../assets/mobile1.png'
import CarrosselMobile2 from '../../assets/mobile2.png'
import CarrosselMobile3 from '../../assets/mobile3.png'
import Banner1 from '../../assets/bannerChuteiras.png'
import Banner2 from '../../assets/bannerCamisas.png'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css';


export default function Home() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false
        });
    }, []);

    const bannerCarrossel = [
        { id: 1, image: Carrossel1 },
        { id: 2, image: Carrossel2 },
        { id: 3, image: Carrossel3 }
    ]

    const bannerCarrosselMobile = [
        { id: 1, image: CarrosselMobile1 },
        { id: 2, image: CarrosselMobile2 },
        { id: 3, image: CarrosselMobile3 }
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

    const paginateMobile = (newDirection) => {
        setDirection(newDirection);
        setCurrentCarrossel((prev) =>
            newDirection === 1
                ? (prev + 1) % bannerCarrosselMobile.length
                : (prev - 1 + bannerCarrosselMobile.length) % bannerCarrosselMobile.length
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

    const goToSlide = (index) => {
        if (index === currentCarrossel) return;

        const newDirection = index > currentCarrossel ? 1 : -1;

        setDirection(newDirection);
        setCurrentCarrossel(index);
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
                            <div className="boxBtnsCarrossel">
                                <div className="boxBtnsCarrossel">
                                    {bannerCarrossel.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`btnBox ${index === currentCarrossel ? "active" : ""}`}
                                            onClick={() => goToSlide(index)}
                                        ></div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="carrosselMobile">
                            <AnimatePresence mode='wait' custom={direction}>
                                <motion.img
                                    key={bannerCarrosselMobile[currentCarrossel].id}
                                    src={bannerCarrosselMobile[currentCarrossel].image}
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
                            <div className="boxBtnsCarrossel">
                                <div className="boxBtnsCarrossel">
                                    {bannerCarrosselMobile.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`btnBox ${index === currentCarrossel ? "active" : ""}`}
                                            onClick={() => goToSlide(index)}
                                        ></div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="boxIntroHome">
                            <div className="boxBannerIntro"  data-aos="zoom-in-down">
                                <div className="bannerBox">
                                    <img src={Banner1} alt="" />
                                    <div className="bannerContent">
                                        <Link to='/chuteira' className='link'><button>CONFIRA</button></Link>
                                    </div>
                                </div>
                                <div className="bannerBox"  data-aos="zoom-in-down">
                                    <img src={Banner2} alt="" />
                                    <div className="bannerContent">
                                        <Link to='/camisa' className='link'><button>SHOP NOW</button></Link>
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