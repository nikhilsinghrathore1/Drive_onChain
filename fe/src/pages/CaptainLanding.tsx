import React, { useRef, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from "/logo.png"
import { FaRegClock } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import NewRidePopup from '../components/NewRidePopup'
import gsap from 'gsap'
import { Power4 } from 'gsap/all'
import CaptainRideConfirmScreen from '../components/CaptainRideConfirmScreen';
import { captainDataContext } from '../context/CaptainContext';

const CaptainLanding = () => {
  const popupRef = useRef(null)
  const confirmRideRef = useRef(null)

  const [popPanelOpen, setPopPanelOpen] = useState(false)

    const context = useContext(captainDataContext)
    
 if(!context){
  throw new Error("the captain data context in not provided ")
 }

  
const {captainData} = context; 

  

  const [confirmRide , setconfirmRide] = useState(false)


  const navigate = useNavigate()



  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}captain/logout`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      localStorage.removeItem("token")
      navigate("/login-captain")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (popPanelOpen) {
      gsap.to(popupRef.current, {
        y: "0%", 
        duration: 0.5,
        ease: Power4.easeInOut
      })
    } else {
      gsap.to(popupRef.current, {
        y: "100%", 
        duration: 1,
        ease: Power4.easeInOut
      })
    }

    if(confirmRide){
      gsap.to(confirmRideRef.current , {
          y:"0%", 
          duration:1,
          ease:Power4.easeInOut
      })
    }else{
      gsap.to(confirmRideRef.current , {
          y:"100%", 
          duration:1,
          ease:Power4.easeInOut
      })

    }
  }, [popPanelOpen , confirmRide])

  return (
    <div className='w-full h-screen relative overflow-hidden'>
      {/* Logo */}
      <div className='absolute left-5 top-5'>
        <img className='w-24 scale-[200%]' src={logo} alt="logo" />
      </div>

      {/* Map */}
      <div className='w-full h-full'>
        <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="map" />
      </div>

      {/* Bottom Panel */}
      <div className='w-full h-full absolute top-0 left-0 flex flex-col justify-end'>
        <div className='w-full h-[35%] relative bg-white py-10 px-5 gap-5 rounded-t-2xl flex flex-col'>
          <div className='w-full h-full flex items-center justify-between'>
            <div className='flex gap-1 items-center'>
              <div className='w-14 h-14 rounded-full overflow-hidden'>
                <img className='w-full h-full object-cover' src="data:image/jpeg;base64,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" alt="profile" />
              </div>
              <h1 className='text-xl font-bold'>{captainData?.fullName}</h1>
            </div>

            <div className='flex flex-col justify-center'>
              <h1 className='text-2xl font-bold'>$293.56</h1>
              <p className='text-gray-600'>Earned</p>
            </div>
          </div>

          <div className='flex items-center justify-center gap-3 mt-5'>
            <div className='w-[33%] h-[15vh] p-1 bg-[#eeee] flex flex-col items-center rounded-xl'>
              <div className='text-5xl font-bold mb-2 opacity-70'>
                <FaRegClock />
              </div>
              <h1 className='text-xl font-bold'>10.2</h1>
              <p>Hours online</p>
            </div>
            <div className='w-[33%] h-[15vh] p-1 bg-[#eeee] flex flex-col items-center rounded-xl'>
              <div className='text-5xl font-bold mb-2 opacity-70'>
                <IoSpeedometerOutline />
              </div>
              <h1 className='text-xl font-bold'>10.2</h1>
              <p>Speed</p>
            </div>
            <div className='w-[33%] h-[15vh] p-1 bg-[#eeee] flex flex-col items-center rounded-xl'>
              <div className='text-5xl font-bold mb-2 opacity-70'>
                <LuNotebook />
              </div>
              <h1 className='text-xl font-bold'>10.2</h1>
              <p>Notes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Panel */}
      <div ref={popupRef} className='w-full absolute translate-y-full bottom-5 left-0'>
        <NewRidePopup func1={setPopPanelOpen} func2={setconfirmRide} />
      </div>
      <div ref={confirmRideRef} className='w-full absolute translate-y-full  h-screen bottom-5 left-0 '>
        <CaptainRideConfirmScreen func1 = {setPopPanelOpen} func2={setconfirmRide}  />
      </div>
    </div>
  )
}

export default CaptainLanding
