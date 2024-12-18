import React, { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import FinishCaptainRide from '../components/FinishCaptainRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Power4 } from 'gsap/all'

const CaptainRiding = () => {

const [finishride , setfinishride] = useState(false)
const finishRef = useRef(null) 

useGSAP(()=>{
               if(finishride){
                              gsap.to(finishRef.current,{
                                             y:"0%",
                                             duration:1,
                                             ease:Power4.easeInOut
                              })
               }else{
                            gsap.to(finishRef.current,{
                              y:"100%",
                              duration:1,
                              ease:Power4.easeInOut
                            })
               }
},[finishride])

  return (
    <div className='w-full h-screen flex flex-col relative justify-between'>
               <div className='w-full h-[83%]'>
                              <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="not showing" />
               </div>
               <div className='w-full relative pt-5 flex items-center justify-around h-[18%] bg-yellow-400 text-black '>
                              <div className='absolute top-2 text-2xl left-[49%] opacity-70 1translate-x-1/2'>
                                             <FaChevronDown/>
                              </div>
                              <h1 className='text-2xl font-bold '>4-KM away</h1>
                              <div onClick={()=>setfinishride(true)}   className=" px-10 rounded-lg active:bg-green-500 text-2xl  font-medium py-3 bg-green-400 flex justify-center items-center text-white">
   
                                            Finish Ride
                              
                              </div>
               </div>

               <div ref={finishRef} className='w-full absolute translate-y-full  bottom-0 left-0 '>
               <FinishCaptainRide/>
               </div>
    </div>
  )
}

export default CaptainRiding