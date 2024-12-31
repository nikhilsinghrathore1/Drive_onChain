import React, { useState } from 'react'
import logo from "/logo.png"

import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'

const RegisterCaptain = () => {
const navigate = useNavigate()
const [fullName , setfullName] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [color, setcolor] = useState("")
const [plateNumber, setplateNumber] = useState<number |null >(null)
const [capacity, setcapacity] = useState<number | null>(null)
const [vehical_type, setvehical_type] = useState("car")

const handleSubmit = async(e:React.FromEvent)=>{
            e.preventDefault()

            const payload = {
              fullName : fullName,
              email:email,
              password:password,
              color:color,
              vehical_type:vehical_type,
              plateNumber:plateNumber,
              capacity:capacity,              
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/register`,payload)

            if(response){
              localStorage.clear()
             localStorage.setItem("token" , response.data.token) 
            const token = localStorage.getItem("token") 
              console.log(token)
              navigate("/captain-landing")        
            }

            setfullName("")
            setcolor("")
            setcapacity(null)
            setplateNumber(null)
            setvehical_type("")
            setemail("")
            setpassword("")

}

  return (
    <div className='w-full h-screen  flex flex-col text-[#353935] relative px-5 py-8  '>

      {/* logo div */}

      <div className='w-full h-12 '>
      <img className='w-24 scale-[200%]' src={logo} alt="not showign" />
    </div>



      {/* form container div */}

      <form onSubmit={handleSubmit} className='w-full mt-12 ' >
          <div className='w-full flex flex-col gap-3'>
              <h1 className='text-xl font-bold'>What's captain's name</h1>
              <div className='flex justify-start gap-5 w-full'>
                      <input onChange={(e)=>setfullName(e.target.value)} value={fullName} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-full' type="text" placeholder='first Name' />
              </div>
          </div>
          <div className='w-full mt-5 flex flex-col gap-3'>
              <h1 className='text-xl font-bold'>what's our Captain's email</h1>
              <div className='flex justify-between w-full'>
                      <input onChange={(e)=>setemail(e.target.value)} value={email} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-full' type="email" placeholder='email' />
              </div>
          </div>
          <div className='w-full mt-5 flex flex-col gap-3'>
              <h1 className='text-xl font-bold'>Enter Password</h1>
              <div className='flex justify-between w-full'>
                      <input onChange={(e)=>setpassword(e.target.value)} value={password} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-full' type="Password" placeholder='Password' />
              </div>
          </div>

          <div className='w-full flex flex-col gap-5 mt-5'>
          <h1 className='text-xl font-bold'>Vehical information</h1>
            <div className='w-full flex justify-between gap-5'>
            <input value={color} onChange={(e)=>setcolor(e.target.value)} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-[48%]' type="text" placeholder='Vehical color' />
                      <input value={plateNumber || ""} onChange={(e)=>setplateNumber(parseInt(e.target.value))}  className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-[48%]' type="number" placeholder='Vehilcal plate' />
            </div>
            <div className='w-full flex justify-between gap-5'>
            <input value={capacity || ""} onChange={(e)=>setcapacity(parseInt(e.target.value))} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-[48%]' type="number" placeholder='Vehical capacity' />
            <select value={vehical_type} onChange={(e)=>setvehical_type(e.target.value)} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-[48%]' name="cars" id="cars">
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                </select>            
             </div>
          </div>
       

          <input className='w-full py-3 text-lg font-semibold text-white bg-black rounded-lg mt-7 tracking-wide' type="submit" value={"Create account"} />
      </form>

      {/* login redirect div */}

      <div className='mt-3 w-full text-center'>
        <h1 className='text-md font-semibold'>Already a Captain ? <Link className='text-blue-400' to="/login-captain">Login here</Link></h1>
      </div>

      {/* footer div */}

      <div className='absolute  bottom-4 w-[90%]'>
      <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
      </div>

    </div>
  )
}

export default RegisterCaptain