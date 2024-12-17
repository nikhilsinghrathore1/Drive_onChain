import React, { useContext, useEffect } from 'react'
import { captainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const CaptainLanding = () => {

  const navigate = useNavigate()

  const context = useContext(captainDataContext)
  if(!context){
    throw new Error("the context not provided")
  }
  const {captainData} = context 
  const handleLogout = async()=>{
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BASE_URL}captain/logout`,{
      headers:{
        Authorization:`bearer ${token}`
      }
    }).then((data)=>{
      localStorage.removeItem("token")
      navigate("/login-captain")
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{

    console.log(captainData)
  },[])

  return (
    <div className='p-10'>

      <button onClick={handleLogout}>logout as captian</button>
    </div>
  )
}

export default CaptainLanding