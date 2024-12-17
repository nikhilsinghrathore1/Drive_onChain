import  { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import logo from "/logo.png"
import axios from 'axios'

const CaptainLogin = () => {


 
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  
  const navigate = useNavigate()
  
  const handleSubmit =async (e:React.FormEvent)=>{
              e.preventDefault()
  
              const payload = {
             
                email:email,
                password:password
                
              }
  
              const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/login`,payload)
              if(!response){
                navigate("/login-captain") 
                return ;
              }
              localStorage.setItem("token",response.data.token);
              navigate("/captain-landing")
              setemail("")
              setpassword("")
  }
  

  return (
    <div className='w-full h-screen  flex flex-col text-[#353935] justify-between relative px-5 py-10  '>

      <div>
    {/* logo div */}

    <div className='w-full h-12 '>
      <img className='w-24 scale-[200%]' src={logo} alt="not showign" />
    </div>



    {/* form container div */}

    <form onSubmit={handleSubmit} className='w-full mt-16 ' >
        <div className='w-full flex flex-col gap-3'>
            <h1 className='text-xl font-bold'>What's our Captain's email</h1>
            <div className='flex justify-start gap-5 w-full'>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-full' type="text" placeholder='first Name' />
            </div>
        </div>
     
        <div className='w-full mt-5 flex flex-col gap-3'>
            <h1 className='text-xl font-bold'>Enter Password</h1>
            <div className='flex justify-between w-full'>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-full' type="Password" placeholder='Password' />
            </div>
        </div>
     

        <input className='w-full py-3 text-lg font-semibold text-white bg-black rounded-lg mt-7 tracking-wide' type="submit" value={"Login"} />
    </form>

    {/* login redirect div */}

    <div className='mt-2 w-full text-center'>
      <h1 className='text-md font-semibold'>Join a Fleet? <Link className='text-blue-400' to="/register-captain">Register as Captain</Link></h1>
    </div>

    </div>

    {/* footer div */}

    <div className='w-full'>

    <Link className='flex text-lg items-center justify-center w-full py-3 rounded-lg bg-[#D5622D] text-white font-semibold' to="/login">Sign as User</Link>

    </div>

  </div>
  )
}

export default CaptainLogin