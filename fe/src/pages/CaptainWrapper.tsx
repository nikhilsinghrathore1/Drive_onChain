import axios from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { captainDataContext } from "../context/CaptainContext"

interface val {
  children : React.ReactNode
}

const CaptainWrapper:React.FC<val> = ({children}) => {

 const context =  useContext(captainDataContext)

 if(!context){
  throw new Error("the captain data context in not provided ")
 }

const {setcaptainData} = context ; 


  const navigate = useNavigate()

  
  useEffect(()=>{
    const token = localStorage.getItem("token")
      if(!token){
        navigate("/login-captain")
        return ;
      }
      
      axios.get(`${import.meta.env.VITE_BASE_URL}captain/profile`,{
        headers: {
          Authorization:`bearer ${token}`
        }
      }).then((data)=>{

        if(data.data.captain){
          setcaptainData(data.data.captain)
          return ;
        }
        else{
          navigate("/login-captain")
          return;
        }

      }).catch((err)=>{
        console.log(err)
        navigate("/login-captain")
        return ; 
      })
      

  },[])


  return (
    <div>{children}</div>
  )
}

export default CaptainWrapper