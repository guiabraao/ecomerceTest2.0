import './styles.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Logo from '../../assets/logo.png'
import ChuteiraBanner from '../../assets/chuteirasHome.png'
import Nike from '../../assets/nike.png'
import Adidas from '../../assets/adidas.png'
import Puma from '../../assets/puma.png'
import Camisa from '../../assets/camisaTest.png'
import Pl from '../../assets/pl.png'
import LaLiga from '../../assets/laliga.png'
import Brasileirao from '../../assets/brasileirao.png'

export default function SobreNos() {
    return (
        <>
            <Header />

            <main>
                <div className="containerSobreNos">
                    <div className="elementos">
                        <div className="element1SobreNos"></div>
                        <div className="element2SobreNos"></div>
                    </div>
                    <div className="boxTextSobreNos">
                        <h2>Sobre <span className='nos'>Nós</span></h2>
                        <div className="boxParagrafoSobreNos">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed velit egestas diam porttitor laoreet. Sed dignissim feugiat sollicitudin. Nunc mollis justo quis purus efficitur tempus. In hac habitasse platea dictumst. Curabitur non quam ut ipsum semper blandit in eu tortor. Sed sodales diam posuere est pharetra scelerisque.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed velit egestas diam porttitor laoreet. Sed dignissim feugiat sollicitudin. Nunc mollis justo quis purus efficitur tempus. In hac habitasse platea dictumst. Curabitur non quam ut ipsum semper blandit in eu tortor. Sed sodales diam posuere est pharetra scelerisque.</p>
                        </div>
                    </div>
                    <div className="boxElementsSobreNos">
                        <img src={Logo} alt="" />
                    </div>


                    <div className="containerChuteirasHome">
                        <div className="boxTxtChuteirasHome">
                            <h1>CHUTEIRAS</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh neque, mollis cursus felis vitae, luctus scelerisque elit. Phasellus luctus dignissim arcu vel auctor. Duis rutrum, lectus eu faucibus hendrerit, libero elit consequat sem, at euismod sapien ante ac justo.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh neque, mollis cursus felis vitae, luctus scelerisque elit. Phasellus luctus dignissim arcu vel auctor. Duis rutrum, lectus eu faucibus hendrerit, libero elit consequat sem, at euismod sapien ante ac justo.</p>
                            <div className="boxMarcasHome">
                                <div className="boxMarcaItem">
                                    <img src={Nike} alt="" />
                                    <span>Nike</span>
                                </div>
                                <div className="boxMarcaItem">
                                    <img src={Adidas} alt="" />
                                    <span>Adidas</span>
                                </div>
                                <div className="boxMarcaItem">
                                    <img src={Puma} alt="" />
                                    <span>Puma</span>
                                </div>
                            </div>
                        </div>

                        <div className="boxChuteirasElements">
                            <div className="elementChuteirasHome"></div>
                            <img src={ChuteiraBanner} alt="Chuteiras Home" className="chuteirasHomeBanner" />
                        </div>
                    </div>

                    <div className="containerCamisasHome">
                        <div className="boxCamisasElements">
                            <div className="elementCamisasHome"></div>
                            <img src={Camisa} alt="" className="camisasHomeBanner" />
                        </div>
                        <div className="boxTxtCamisasHome">
                            <h1>CAMISAS</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh neque, mollis cursus felis vitae, luctus scelerisque elit. Phasellus luctus dignissim arcu vel auctor. Duis rutrum, lectus eu faucibus hendrerit, libero elit consequat sem, at euismod sapien ante ac justo.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh neque, mollis cursus felis vitae, luctus scelerisque elit. Phasellus luctus dignissim arcu vel auctor. Duis rutrum, lectus eu faucibus hendrerit, libero elit consequat sem, at euismod sapien ante ac justo.</p>
                            <div className="boxLigaHome">
                                <div className="boxLigaItem">
                                    <img src={Pl} alt="" />
                                    <span>Premiere League</span>
                                </div>
                                <div className="boxLigaItem">
                                    <img src={LaLiga} alt="" />
                                    <span>La Liga</span>
                                </div>
                                <div className="boxLigaItem">
                                    <img src={Brasileirao} alt="" />
                                    <span>Brasileirão</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}