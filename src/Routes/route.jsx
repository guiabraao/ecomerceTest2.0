import { BrowserRouter, Router, Routes, Route, useParams  } from "react-router-dom";
import Home from "../Pages/Home";
import Cadastros from "../Pages/Cadastros";
import SobreNos from "../Pages/SobreNos";
import ChuteirasPage from "../Pages/Chuteiras"
import CamisasPage from "../Pages/Camisas";
import Produto from "../Pages/Produto";
import Estoque from "../Pages/Estoque";
import User from "../Pages/User";
import AdminRoute from "../Protected/adminRoute";
import Admin from "../Pages/Admin";

export default function AppRouter() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/camisa' element={<CamisasPage />} />
                <Route path='/chuteira' element={<ChuteirasPage />} />
                <Route path='/sobrenos' element={<SobreNos />} />
                <Route path="/produto/:tipo/:id" element={<Produto />} />
                <Route path="/estoque" element={<Estoque />} />
                <Route path='/cadastros' element={<Cadastros />} />
                <Route path='/user' element={<User />}/>
                <Route path='/admin' element={<AdminRoute> <Admin /> </AdminRoute>}/>
            </Routes>
        </>
    )
}