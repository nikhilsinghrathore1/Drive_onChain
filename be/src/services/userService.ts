import { prisma } from "../db/db";

export const storeUser = async(firstName: string , lastName:string , email:string , password:string )=>{
               if(!firstName || !email || !password){
                              throw new Error("All fields are required"); 
               }

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



