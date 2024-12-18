import * as React from "react"
import { FaChevronDown } from "react-icons/fa6"


interface val {
  func1 : (value:boolean) =>void,
  func2 : (value:boolean) =>void
}


const ChooseRide:React.FC<val> = ({func1 , func2}) => {
  return (
               <div className='w-full h-fit py-10 relative bg-white flex flex-col px-2 '>
                              <div className="absolute right-6 top-12 text-xl" onClick={()=>(func1(false))}>  <FaChevronDown/></div>

               <h1 className="text-2xl text-center font-medium mb-5">Choose your trip</h1>
         
               <div onClick={()=>(func2(true),func1(false))} className="flex w-full h-[11vh] my-3 items-center active:border-4 border-[1px] border-black rounded-xl justify-between px-5 py-2">
                 {/* this is the image div  */}
                 <div className="w-[25%] h-full flex items-center overflow-hidden bg-red-300" >
                   <img className="w-full scale-[130%]  " src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="not showing" />
                 </div>
         
             {/* this is the info div */}
         
             <div c className="w-1/2 items-start leading-[1.58rem] pl-2 flex flex-col">
             <h1 className="text-[1.45rem] font-medium">Uber Go</h1>
             <div className="flex text-gray-600 gap-1 items-center">
               <h1>8:46</h1>
               <div className="flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-[#eee]"></div>
                   <h1>4 min away</h1>
               </div>
         
             </div>
             </div>
         
         
             {/* this is the price fare div */}
         
             <div >
               <h1 className="text-2xl font-bold">$222</h1>
         
             </div>
         
               </div>
               <div onClick={()=>(func2(true),func1(false))} className="flex w-full h-[11vh] my-3 items-center active:border-4 border-[1px] border-black rounded-xl justify-between px-5 ">
                 {/* this is the image div  */}
                 <div className="w-[25%] h-full flex items-center overflow-hidden " >
                   <img className="w-full  scale-[130%] object-cover  " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="not showing" />
                 </div>
         
             {/* this is the info div */}
         
             <div className="w-1/2 items-start leading-[1.58rem] pl-2 flex flex-col">
             <h1 className="text-[1.45rem] font-medium">UberAuto</h1>
             <div className="flex text-gray-600 gap-1 items-center">
               <h1>8:46</h1>
               <div className="flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-[#eee]"></div>
                   <h1>10 min away</h1>
               </div>
         
             </div>
             </div>
         
         
             {/* this is the price fare div */}
         
             <div >
               <h1 className="text-2xl font-bold">$103</h1>
         
             </div>
         
               </div>
               <div onClick={()=>(func2(true),func1(false))} className="flex w-full h-[11vh] my-3 items-center active:border-4 border-[1px] border-black rounded-xl justify-between px-5 ">
                 {/* this is the image div  */}
                 <div className="w-[25%] h-full flex items-center overflow-hidden " >
                   <img className="w-full  scale-[130%] object-cover  " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="not showing" />
                 </div>
         
             {/* this is the info div */}
         
             <div className="w-1/2 items-start leading-[1.58rem] pl-2 flex flex-col">
             <h1 className="text-[1.45rem] font-medium">Uber moto </h1>
             <div className="flex text-gray-600 gap-1 items-center">
               <h1>8:46</h1>
               <div className="flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-[#eee]"></div>
                   <h1>3 min away</h1>
               </div>
         
             </div>
             </div>
         
         
             {/* this is the price fare div */}
         
             <div >
               <h1 className="text-2xl font-bold">$65</h1>
         
             </div>
         
               </div>
         e
             </div>
  )
}

export default ChooseRide