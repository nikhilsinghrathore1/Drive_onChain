import  { createContext, useState, ReactNode } from "react";

interface Val {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserContextType {
  userdata: Val | null;
  setuserdata: React.Dispatch<React.SetStateAction<Val | null>>;
}

const userDataContext = createContext<UserContextType | null>(null);

const UserContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userdata, setuserdata] = useState<Val | null>(null);

  return (
    <userDataContext.Provider value={{ userdata, setuserdata }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
export { userDataContext };
