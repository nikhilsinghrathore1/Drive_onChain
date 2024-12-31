import { ImLocation2 } from "react-icons/im";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import * as React from "react";
import axios from "axios";


interface val { 
  func1 : (value : boolean) =>void ,
  func2 : (value : boolean) =>void,
  vehical:string,  
  pickup:string,
  destination:string,
  fare:string,
}


const confirmRide = async(pickup:string,destination:string,vehical:string)=>{
  const token = localStorage.getItem("token")
  const payload ={
    pickup,
    destination,
    vehical_type:vehical
  }
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/create`,payload ,{
    headers:{
      Authorization:`bearer ${token}`
    }
  })

  console.log(response.data)

}


const ConfirmRide:React.FC<val> = ({func1 , func2,vehical, pickup , destination ,fare}) => {



  return (
  <div className='w-full  h-fit py-5 relative bg-white flex flex-col px-2 '>
               <h1 className="text-3xl font-bold ">Confirm your Ride</h1>

               <div className="w-full  h-[20vh] mb-5 flex items-center justify-center overflow-hidden mt-10">
                              <img className="w-[80%] h-full object-cover" src="https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png" alt="not showing" />
               </div>

               <div className="flex py-3   items-center gap-5 w-full  px-8 my-1">
                                             <div className="text-2xl"><ImLocation2/></div>
                                             <div className="flex flex-col ">
                                              <h1 className="text-2xl font-medium">{pickup}</h1>
                                              <p className="font-medium text-lg text-gray-600">kankariya talab, ajmer</p>
                                             </div>
               </div>                                
               <div className="flex items-center gap-5 w-full  px-8 my-4">
                                             <div className="text-2xl"><FaLocationDot/></div>
                                             <div className="flex flex-col ">
                                              <h1 className="text-2xl font-medium">{destination}</h1>
                                              <p className="font-medium text-lg text-gray-600">Koromangal talab, Banglore</p>
                                             </div>
               </div>                                
               
               <div className="flex items-center gap-5 w-full  px-8 my-4">
                                             <div className="text-2xl"><RiMoneyRupeeCircleFill/></div>
                                             <div className="flex flex-col ">
                                              <h1 className="text-2xl font-medium">${fare}</h1>
                                              <p className="font-medium text-lg text-gray-600">Cash , Crypto</p>
                                             </div>
               </div>                                

               <div onClick={()=>(func1(false) , func2(true) , confirmRide(pickup,destination,vehical))} className="w-full rounded-lg active:bg-green-500 text-2xl mt-5 font-medium py-3 bg-green-400 flex justify-center items-center text-white">

                Confirm

               </div>
               
  </div>
  )
}

export default ConfirmRide