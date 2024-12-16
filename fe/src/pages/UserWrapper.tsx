import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

interface UserWrapperProps {
  children: React.ReactNode;
}

const UserWrapper: React.FC<UserWrapperProps> = ({ children }) => {
  const context = useContext(userDataContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserWrapper must be used within a UserContext.Provider");
  }

  const { userdata ,setuserdata } = context;


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}user/profile`,{
               headers:{
                              Authorization : `bearer ${token}`
               }
    }).then((data)=>{
               setuserdata(data.data.user)
    }).catch((err)=>{
               console.log(err)
               navigate("/login")
    })

  }, [navigate , setuserdata]);

  return <div>{children}</div>;
};

export default UserWrapper;
