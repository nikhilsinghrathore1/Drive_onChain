import  { useContext, useDebugValue, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
const UserLanding = () => {

const context = useContext(userDataContext)

if(!context){
  throw new Error("the provider is not specified")
}

const {userdata} = context

useEffect(() => {
console.log(userdata)
}, [])


  return (
    <div>UserLanding page</div>
  )
}

export default UserLanding
