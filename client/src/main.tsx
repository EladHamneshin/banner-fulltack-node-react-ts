import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routs from './routes/Routs.tsx'
import Login from './pages/Login.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routs />
    <Login />
  </React.StrictMode>,
)
