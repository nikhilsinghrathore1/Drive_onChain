import { prisma } from "../db/db";

export const storeUser = async(firstName: string , lastName:string , email:string , password:string )=>{
               if(!firstName || !email || !password){
                              throw new Error("All fields are required"); 
               }
               try{

                              const user = await prisma.user.create({
                                             data:{
                                                            firstName:firstName,
                                                            lastName:lastName,
                                                            email:email,
                                                            password:password,
                                             }
                              })
                              return user ;
               }
               catch(err){
                              console.log("there was some error while the creation of the user " , err)
               }


}


export const CreateBlackListToken = async(token:string)=>{
               
               if(!token){
                              throw new Error("the token not provided for blacklisting")
               }
               try{

                              const blacklistedToken = await prisma.blackListToken.create({
                                             data:
                                             {
                                                            token:token
                                             }
                              })
               
                              return blacklistedToken; 
               }
               catch(err){
                              console.log("there was some error in the creation of this blacklist token",err)
                              return ; 
               }

}


