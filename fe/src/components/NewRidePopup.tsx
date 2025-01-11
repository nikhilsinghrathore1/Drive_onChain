import { FaLocationDot } from 'react-icons/fa6'
import { ImLocation2 } from 'react-icons/im'
import { RiMoneyRupeeCircleFill } from 'react-icons/ri'

interface val {
  func1:(value:boolean) =>void,
  func2:(value:boolean) =>void,
  confirm : () =>void
}

const NewRidePopup:React.FC<val> = ({func1 , func2 , confirm}) => {
  return (
   <div className='w-full  h-fit pt-5 relative rounded-2xl bg-white flex flex-col px-2 '>
                  <h1 className="text-[2rem] mb-10 px-2 font-bold ">New Ride Available!</h1>
   
              
   
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

                  <div className='w-full px-5 mb-7 mt-5 flex items-center justify-between'>                         
   
                  <div onClick={()=>(func2(true) , confirm())}  className=" px-10 rounded-lg active:bg-green-500 text-2xl mt-4 font-medium py-3 bg-green-400 flex justify-center items-center text-white">
   
                   Accept
   
                  </div>
   
                  <div onClick={()=>func1(false)} className=" px-10 rounded-lg active:bg-gray-400 text-2xl mt-2 font-medium py-3 bg-gray-300 text-gray-700 flex justify-center items-center ">
   
                   Ignore
   
                  </div>
                  </div>
                  
     </div>
  )
}

export default NewRidePopup