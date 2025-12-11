import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider  from './context/authContext.jsx'
import ScrollToTop from './Components/Scroll/index.jsx'
import Admin from './Pages/Admin/index.jsx'
import Estoque from './Pages/Estoque/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
