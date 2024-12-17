import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'

createRoot(document.getElementById('root')!).render(
  <CaptainContext>
        <UserContext>
                <App />
        </UserContext>
  </CaptainContext>

)
