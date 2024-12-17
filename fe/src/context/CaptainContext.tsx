import { createContext, useState } from 'react'


interface val { 
               fullName : string, 
               email : string , 
               password : string ,
               vehical_type : string , 
               plateNumber: number , 
               color : string, 
               capacity : number
}

interface contextVal { 
               captainData : val | null,
               setcaptainData : React.Dispatch<React.SetStateAction<val | null>>;
}


const captainDataContext = createContext<contextVal | null >(null)
const CaptainContext:React.FC<{children:React.ReactNode}> = ({children}) => {
  const [captainData , setcaptainData] = useState<val |null>(null)


  return (
    <captainDataContext.Provider value={{captainData,setcaptainData}}>
               {children}
    </captainDataContext.Provider>
  )
}
export {captainDataContext}

export default CaptainContext