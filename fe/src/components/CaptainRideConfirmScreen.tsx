import { FaLocationDot } from "react-icons/fa6"
import { ImLocation2 } from "react-icons/im"
import { FaChevronDown } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri"
import { Link } from "react-router-dom";
import { useState } from "react";

interface val {
   func1 : (value:boolean) =>void,
   func2 : (value:boolean) =>void,
   start:(otp:string) =>void
}

const CaptainRideConfirmScreen:React.FC<val> = ({func1,func2 , start}) => {

   const [otp , setotp] = useState("")

  return (
  <div className='w-full  h-full pt-5 relative rounded-2xl bg-white flex flex-col px-2 justify-between pb-10 '> 

               <div className="w-full pt-10 h-fit  flex justify-center  text-4xl text-gray-500   ">
               <FaChevronDown/>
               </div>
               <div>

                  <h1 className="text-[2rem] mb-8 px-2 font-bold tracking-tight ">Confirm this ride to Start</h1>
   

               <div className="w-full bg-yellow-400 py-4 border-[1px] mt-5 mb-8 border-black/30  rounded-xl flex items-center justify-between px-5">

                              <div className="flex items-center gap-3">
                                             <div className="w-16 h-16 rounded-full overflow-hidden">
                                                            <img className="w-full h-full object-cover" src="data:image/jpeg;base64,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" alt="not showing" />
                                             </div>
                                                            <h1 className="text-2xl font-semibold"> Miss nehal</h1>
                              </div>

                              <h1 className="text-2xl font-semibold">22-KM</h1>

               </div>
              
   
                  <div className="flex py-3 items-center gap-5 w-full  px-8 my-1">
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
                  
                  <div className="flex items-center gap-5 w-full  px-8 mt-5">
                                                <div className="text-2xl"><RiMoneyRupeeCircleFill/></div>
                                                <div className="flex flex-col ">
                                                 <h1 className="text-2xl font-medium">$332.56</h1>
                                                 <p className="font-medium text-lg text-gray-600">Cash , Crypto</p>
                                                </div>
                  </div>      
                  </div>


               <div>

                  <div className=" w-full">
                  <input value={otp} onChange={(e)=>setotp(e.target.value)}  className='bg-[#EEEEEE] text-lg font-bold tracking-wide rounded-lg outline-orange-400  py-5 px-10 w-full' type="number" placeholder='Enter OTP' />

                 </div> 

   
                  <div onClick={()=>start(otp)} className=" w-full rounded-lg active:bg-green-500 text-2xl mt-2 font-medium py-3 bg-green-400 flex justify-center items-center text-white">
   
                   Accept
   
                  </div>
   
                  <div onClick={()=>(func1(false) , func2(false))} className=" w-full rounded-lg active:bg-red-400 text-2xl mt-2 font-medium py-3 bg-red-500 text-white flex justify-center items-center ">
   
                   Canel
   
                  </div>

                  </div>
                  
     </div>
  )
}

export default CaptainRideConfirmScreen