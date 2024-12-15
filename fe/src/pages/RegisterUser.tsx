import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "/logo.png"


const RegisterUser = () => {
const [firstName , setFirstName] = useState("")
const [lastName , setlastName] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")

const [body ,  setbody] = useState({})

const handleSubmit = (e:React.FromEvent)=>{
            e.preventDefault()

            setbody({
              firstName:firstName,
              lastName:lastName,
              email:email,
              password:password

            })

            setFirstName("")
            setlastName("")
            setemail("")
            setpassword("")
}




  return (
    <div className='w-full h-screen  flex flex-col text-[#353935] relative px-5 py-10  '>

      {/* logo div */}

      <div className='w-full h-12 '>
      <img className='w-24 scale-[200%]' src={logo} alt="not showign" />
    </div>



      {/* form container div */}

      <form onSubmit={handleSubmit} className='w-full mt-10 ' >
          <div className='w-full flex flex-col gap-3'>
              <h1 className='text-xl font-bold'>What's your name</h1>
              <div className='flex justify-start gap-5 w-full'>
                      <input onChange={(e)=>setFirstName(e.target.value)} value={firstName} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-[45%]' type="text" placeholder='first Name' />
                      <input onChange={(e)=>setlastName(e.target.value)} value={lastName} className='bg-[#EEEEEE] rounded-lg outline-orange-400  py-2 px-3 w-[45%]' type="text" placeholder='last Name' />
              </div>
          </div>
          <div className='w-full mt-5 flex flex-col gap-3'>
              <h1 className='text-xl font-bold'>what's your email</h1>
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
       

          <input className='w-full py-3 text-lg font-semibold text-white bg-black rounded-lg mt-7 tracking-wide' type="submit" value={"Create account"} />
      </form>

      {/* login redirect div */}

      <div className='mt-2 w-full text-center'>
        <h1 className='text-md font-semibold'>Already have Account? <Link className='text-blue-400' to="/login">Login here</Link></h1>
      </div>

      {/* footer div */}

      <div className='absolute  bottom-4 w-[90%]'>
      <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
      </div>

    </div>
  )
}

export default RegisterUser