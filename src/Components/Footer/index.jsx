import './styles.css'
import Logo from '../../assets/whiteLogo.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footerBox">
                    <div className="footerTop">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="footerList">
                        <ul>
                            <Link to="/chuteiras" className='link'><li><span>Chuteiras</span></li></Link>
                            <Link to="/camisas" className='link'><li><span>Camisas</span></li></Link>
                            <Link to="/sobrenos" className='link'><li><span>Sobre Nós</span></li></Link>
                        </ul>
                    </div>
                    <p>copyrigth by 2025 © @guiabraao</p>
                </div>
            </footer>
        </>
    )
}