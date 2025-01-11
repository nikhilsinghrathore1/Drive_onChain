import axios from 'axios'
import  { useState , useRef  , useEffect , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "/logo.png"
import * as React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Power4 } from 'gsap/all'
import { FaChevronDown, FaHackerNews } from "react-icons/fa6";
import LocationSearchPanel from '../components/LocationSearchPanel'
import ChooseRide from '../components/ChooseRide'
import ConfirmRide from '../components/ConfirmRide'
import LookingForCaptian from '../components/LookingForCaptian'
import { SocketContext } from '../context/socketContext'
import { userDataContext } from '../context/UserContext'
import { errors } from 'web3'





const UserLanding = () => {
  const navigate = useNavigate()
  const [pickup, setpickup] = useState("")
  const [finalpickup, setfinalpickup] = useState("")
  const [destination, setdestination] = useState("")
  const [finalDestination, setfinalDestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const [chooseRideOpen, setchooseRideOpen] = useState(false)
  const [confirmRideOpen, setconfirmRideOpen] = useState(false)
  const [LookingForCaptainOpen, setLookingForCaptainOpen] = useState(false)
  const panelRef = useRef(null)
  const panelcloseref = useRef(null)
  const chooseRideref = useRef(null)
  const ConfirmRideref = useRef(null)
  const LookingForCaptainOpenref= useRef(null)
  const [debouncedPickup, setdebouncedPickup] = useState("")
  const [debounceddestination, setdebounceddestination] = useState("")
  const [suggestedPickup, setsuggestedPickup] = useState([])
  const [suggestedDestination, setsuggestedDestination] = useState([])
  const [fare, setfare] = useState({})
  const [finalfare, setfinalfare] = useState("")
  const [vehical, setvehical] = useState("")



  useEffect(() => {
    console.log("entered")
    const timer = setTimeout(() => {
        setdebouncedPickup(pickup)
    }, 500);

    console.log("existed")

    return () => clearTimeout(timer)
  }, [pickup])
  

  useEffect(() => {
    console.log("entered")
    const timer = setTimeout(() => {
      setdebounceddestination(destination)
    }, 500);

    console.log("existed")

    return () => clearTimeout(timer)
  }, [destination])
  



const handlelogout = async() =>{
  const token = localStorage.getItem("token")

  if(token){
    axios.get(`${import.meta.env.VITE_BASE_URL}user/logout`,{
      headers:{
        Authorization:`bearer ${token}`
      }
    }).then((data)=>{
      
      localStorage.removeItem("token"); 
      navigate("/login")
    }).catch((err)=>{
      console.log(err)
    })
    
  }
}

const socketcontext = useContext(SocketContext)
const userContext = useContext(userDataContext)
if(!socketcontext){
  throw new Error("some error occured")
}
if(!userContext){
  throw new Error("some error occured")
}

const {userdata} = userContext
const {socket} = socketcontext







useEffect(()=>{
  if(userdata){

    console.log(userdata.id)
    console.log("emited")
    socket.emit("join" , {userId : userdata?.id ,  userType:"user"})
    console.log("done with emmision ")
  }
},[userdata])

   

  useEffect(() => {
    if(debouncedPickup){

    
    console.log(debouncedPickup)
    const handleSubmit = async() =>{
      const token = localStorage.getItem("token")
      console.log(token)
      const payload = {
        pickup : pickup,
        destination:destination
      }
    
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}map/get-suggestion?input=${debouncedPickup}` ,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
    
      console.log(response.data)
      // setpickup("")
      // setdestination("")
      setsuggestedPickup(response.data)

    }
    handleSubmit()
  }
  }, [debouncedPickup])
  
  useEffect(() => {
    if(debounceddestination){

    
    console.log(debounceddestination)
    const handleSubmit = async() =>{
      const token = localStorage.getItem("token")
      console.log(token)
      const payload = {
        pickup : pickup,
        destination:destination
      }
    
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}map/get-suggestion?input=${debounceddestination}` ,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
    
      console.log(response.data)
      setsuggestedDestination(response.data)
      // setpickup("")
      // setdestination("")

    }
    handleSubmit()
  }
  }, [debounceddestination])

  socket.on("ride-confirmed" ,ride=>{
    console.log("ride-confirmed")
    navigate("/riding")
  })

useGSAP(()=>{
  if(panelOpen){

    gsap.to(panelRef.current,{
      height:"70%",
      ease:Power4.easeInOut,
      duration:1
    })
    gsap.to(panelcloseref.current,{
      rotate:"0deg",
      ease:Power4.easeInOut,
    })
  }else{
    gsap.to(panelRef.current,{
      height:"0%",
      ease:Power4.easeInOut,
      duration:1
    })
    gsap.to(panelcloseref.current,{
      rotate:"180deg",
      ease:Power4.easeInOut,
    })
  }

  
},[panelOpen])

useGSAP(()=>{
  if(chooseRideOpen){

    gsap.to(chooseRideref.current, {
      transform: "translateY(0%)", 
      duration:1,
      ease:Power4.easeInOut
    });
  }else
  {
    
        gsap.to(chooseRideref.current, {
          transform: "translateY(100%)", 
          duration:1,
          ease:Power4.easeInOut
        });

  }
  
},[chooseRideOpen])


useGSAP(()=>{
  if(confirmRideOpen){
    gsap.to(ConfirmRideref.current,{
      y:"0%",
      duration:1,
      ease:Power4.easeInOut,
    })
  }else{
    gsap.to(ConfirmRideref.current,{
      y:"100%",
      duration:1,
      ease:Power4.easeInOut,
    })
  }
},[confirmRideOpen])

const findRide = async() =>{
  const token = localStorage.getItem("token")
  const payload = {
    pickup,
    destination
  }
  console.log(payload)
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}map/get-fare?origin=${pickup}&destination=${destination}`,{
    headers:{
      Authorization :`bearer ${token}`
    }
  })
  setfare(response.data)
}


useGSAP(()=>{
  if(LookingForCaptainOpen){
    gsap.to(LookingForCaptainOpenref.current,{
      y:"0%",
      duration:1,
      ease:Power4.easeInOut
    })
  }else{
    gsap.to(LookingForCaptainOpenref.current,{
      y:"100%",
      duration:1,
      ease:Power4.easeInOut
    })
  }
},[LookingForCaptainOpen])




  return (
    <div className='w-full h-screen relative overflow-hidden '>
      {/* this is the logo div */}
    <div className=' absolute left-5 top-5 '>
      <img className='w-24 scale-[200%]' src={logo} alt="not showign" />
    </div>

    {/* map div */}

    <div className='w-full h-full'>
              <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif" alt="not showing" />
    </div>

    {/* the enter destination div */}

    <div className='w-full h-full absolute top-0 left-0  flex flex-col justify-end'>

      {/* this is the selection div */}
      <div className='w-full h-[30%] relative bg-white p-5 gap-5 rounded-t-2xl flex flex-col'>

            <div onClick={()=>setpanelOpen(false)} ref={panelcloseref} className='absolute right-6 top-6 text-xl rotate-180'>
              <FaChevronDown/>
            </div>

            <h2 className='text-4xl  font-semibold mb-4'>Find a trip</h2>
            <input onClick={()=>setpanelOpen(true)} value={pickup} onChange={(e)=>setpickup( e.target.value) } className='bg-[#EEEEEE] rounded-lg font-semibold text-lg outline-orange-400  py-2 pr-3 pl-14 w-full 'type="text" placeholder='Enter pick-up location' />
            <input onClick={()=>setpanelOpen(true)} value={destination} onChange={(e)=>setdestination(e.target.value)} className='bg-[#EEEEEE] rounded-lg font-semibold text-lg pl-14 pr-3 outline-orange-400  py-2 w-full ' type="text" placeholder='Enter your destination' />
            <div className='h-16 w-1 bg-black absolute top-[56%] rounded-full -translate-y-1/2 left-10'></div>
            <div onClick={()=>(setpanelOpen(false), setchooseRideOpen(true), findRide())} className='bg-black rounded-lg font-semibold text-lg text-center mt-10 text-white   outline-orange-400  py-2 w-full '>find Ride</div>
      </div>


{/* this is absolute pannel that is hidden below only appears when user clicks on location or destination prompts  */}
      <div ref={panelRef} className='w-full h-[0%]  '>
        <LocationSearchPanel func1 = {setchooseRideOpen} func2 = {setpanelOpen} finalPickup ={setpickup} pickUPsuggestion={suggestedPickup} finalDestination={setdestination} destinationsuggestion={suggestedDestination} />
      </div>

    </div>

    {/* this is the absolute div that is hidden below , only appears when user selects an Location for now it is hard coded but ig i have to maintain a state for pickup and drop off destination in this div user will choose the vehical type */}

      <div ref={chooseRideref} className='w-full absolute translate-y-full bottom-5 left-0'>
          <ChooseRide setvehical={setvehical} finalfare={setfinalfare} fare={fare} func1={setchooseRideOpen} func2 ={setconfirmRideOpen}/>
      </div>


      {/* this is an absolute div that is hidden below only appears when user select and vehical it gives them clear details about thier trip and prompts them to confirm thier trip  */}
      <div ref={ConfirmRideref}  className='w-full absolute translate-y-full  bottom-5 left-0'>
        <ConfirmRide vehical={vehical}  pickup={pickup} destination={destination} fare={finalfare} func1 ={setconfirmRideOpen} func2={setLookingForCaptainOpen}/>
      </div>

      {/* this is an absolute div that is hidden below only appears when user confirms his ride and this page is a waiting screen it is shown until a captain selects this trip  */}
      <div  ref={LookingForCaptainOpenref} className='w-full absolute translate-y-full   bottom-5 left-0'>
        <LookingForCaptian pickup={pickup} destination={destination} fare={finalfare}/>
      </div>


    </div>

  )
} 

export default UserLanding
