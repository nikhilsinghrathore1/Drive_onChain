import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'
import { SocketProvider } from './context/socketContext'

createRoot(document.getElementById('root')!).render(
  <CaptainContext>
        <UserContext>
    <SocketProvider>
                <App />
    </SocketProvider>
        </UserContext>
  </CaptainContext>

)
