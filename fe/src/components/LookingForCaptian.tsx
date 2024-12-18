import { FaLocationDot } from 'react-icons/fa6'
import { ImLocation2 } from 'react-icons/im'
import { RiMoneyRupeeCircleFill } from 'react-icons/ri'

const LookingForCaptian = () => {
  return (
 <div className='w-full  h-fit py-5 relative bg-white flex flex-col px-2 rounded-t-2xl '>
               <h1 className="text-3xl text-center font-bold ">Looking For Captain</h1>

               <div className="w-full  h-[20vh] mb-5 flex items-center justify-center overflow-hidden mt-5">
                              <img className="w-[80%] h-full object-cover" src="https://blogadmin.uberinternal.com/wp-content/uploads/2018/02/Cover-Pic-1.gif" alt="not showing" />
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

           
               
  </div>
  )
}

export default LookingForCaptian