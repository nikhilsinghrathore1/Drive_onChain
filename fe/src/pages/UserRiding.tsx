import { useContext } from "react"
import UserPayment from "../components/UserPayment"
import { SocketContext } from "../context/socketContext"



const UserRiding = () => {

const socketContext = useContext(SocketContext)
if(!socketContext){
  throw new Error("some error occured")
}
const {socket} = socketContext

socket.on("start-ride" , ride=>{
  console.log("ride-started")
})
  return (
    <div className='w-full h-screen overflow-hidden relative'>
               <div className='w-full h-full'>
                              <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="not showing" />
               </div>


               <div   className='w-full absolute py-5 bg-white bottom-0 left-0'>
                              <UserPayment/>
               </div>


               
    </div>
  )
}

export default UserRiding