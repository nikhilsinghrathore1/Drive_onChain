import axios from 'axios'
import  { useContext, useDebugValue, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'

const UserLanding = () => {
  const navigate = useNavigate()

const context = useContext(userDataContext)

if(!context){
  throw new Error("the provider is not")
}

const {userdata} = context

useEffect(() => {
console.log(userdata)
}, [])


const handlelogout = async() =>{
  const token = localStorage.getItem("token")

  if(token){
    axios.get(`${import.meta.env.VITE_BASE_URL}user/logout`,{
      headers:{
        Authorization:`bearer ${token}`
      }
    }).then((data)=>{
      
      localStorage.removeItem("token"); 
      navigate("/login")
    }).catch((err)=>{
      console.log(err)
    })
    
  }
}


  return (
    <div>

    <button onClick={handlelogout}>
      logout
    </button>

    </div>

  )
}

export default UserLanding
