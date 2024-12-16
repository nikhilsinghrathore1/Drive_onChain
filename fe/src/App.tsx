
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import RegisterCaptain from './pages/RegisterCaptain'
import RegisterUser from './pages/RegisterUser'
import UserLanding from './pages/UserLanding'
import UserLogin from './pages/UserLogin'
import UserWrapper from './pages/UserWrapper'

function App() {

  return (
    
<BrowserRouter>
<Routes>

    <Route path ="/"  element={<Home/>}/>
    <Route path ="/login"  element={<UserLogin/>}/>
    <Route path ="/register"  element={<RegisterUser/>}/>
    <Route path ="/register-captain"  element={<RegisterCaptain/>}/>
    <Route path ="/login-captain"  element={<CaptainLogin/>}/>
    <Route path ="/user-landing"  element={
      <UserWrapper>

    <UserLanding/>
      </UserWrapper>
    }/>

</Routes>
</BrowserRouter>
  )
}

export default App
