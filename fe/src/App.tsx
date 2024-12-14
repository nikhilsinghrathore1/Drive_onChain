
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import RegisterCaptain from './pages/RegisterCaptain'
import RegisterUser from './pages/RegisterUser'
import UserLogin from './pages/UserLogin'

function App() {

  return (
<BrowserRouter>
<Routes>

    <Route path ="/"  element={<Home/>}/>
    <Route path ="/login"  element={<UserLogin/>}/>
    <Route path ="/register"  element={<RegisterUser/>}/>
    <Route path ="/captain_register"  element={<RegisterCaptain/>}/>
    <Route path ="/captain_login"  element={<CaptainLogin/>}/>

</Routes>
</BrowserRouter>
  )
}

export default App