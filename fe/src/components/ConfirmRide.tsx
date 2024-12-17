import { ImLocation2 } from "react-icons/im";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

import { FaLocationDot } from "react-icons/fa6";


const ConfirmRide = ({func1 , func2}) => {



  return (
  <div className='w-full  h-fit py-5 relative bg-white flex flex-col px-2 '>
               <h1 className="text-3xl font-bold ">Confirm your Ride</h1>

               <div className="w-full  h-[20vh] mb-5 flex items-center justify-center overflow-hidden mt-10">
                              <img className="w-[80%] h-full object-cover" src="https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png" alt="not showing" />
               </div>

               <div className="flex py-3   items-center gap-5 w-full  px-8 my-1">
                                             <div className="text-2xl"><ImLocation2/></div>
                                             <div className="flex flex-col ">
                                              <h1 className="text-2xl font-medium">Drapper house/35-B</h1>
                                              <p className="font-medium text-lg text-gray-600">kankariya talab, ajmer</p>
                                             </div>
               </div>                                
               <div className="flex items-center gap-5 w-full  px-8 my-4">
                                             <div className="text-2xl"><FaLocationDot/></div>
                                             <div className="flex flex-col ">
                                              <h1 className="text-2xl font-medium">Mixer house/39-A</h1>
                                              <p className="font-medium text-lg text-gray-600">Koromangal talab, Banglore</p>
                                             </div>
               </div>                                
               
               <div className="flex items-center gap-5 w-full  px-8 my-4">
                                             <div className="text-2xl"><RiMoneyRupeeCircleFill/></div>
                                             <div className="flex flex-col ">
                                              <h1 className="text-2xl font-medium">$332.56</h1>
                                              <p className="font-medium text-lg text-gray-600">Cash , Crypto</p>
                                             </div>
               </div>                                

               <div onClick={()=>(func1(false) , func2(true))} className="w-full rounded-lg active:bg-green-500 text-2xl mt-5 font-medium py-3 bg-green-400 flex justify-center items-center text-white">

                Confirm

               </div>
               
  </div>
  )
}

export default ConfirmRide