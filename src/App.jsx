import { useState } from 'react'
import './App.css'
import AppRouter from './Routes/route'
import AuthProvider from './context/authContext.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}

export default App
