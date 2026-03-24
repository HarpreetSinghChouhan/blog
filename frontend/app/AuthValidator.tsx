import AdminRegister1, { AdminLogin1, AllUB, RegisterUserBloger } from "@/lib/api";
import { ListItem } from "@mui/material";
import Error from "./script";
import { useEffect } from "react";

export default async function Register1(
  go: Function,
  seterror: any,
  form: any,
) {
  //   console.log(form);/

  const response = await AdminRegister1(form);
  //   console.log(response);
  if (response.status == true) {
    // console.log(response);
    let token = response.token;
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/`;
    go("/admin");
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function Login1(data: any, go: Function, seterror: any) {
  const response = await AdminLogin1(data);
  //   console.log(response);
  if (response.status == true) {
    let token = response.token;
    localStorage.setItem("token", JSON.stringify(token));
    document.cookie = `token=${token}; path=/`;
    go("/admin");
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function UserBlogerAdd(form: any, go: Function, seterror: any) {
  let token = localStorage.getItem("token");
  const response = await RegisterUserBloger(form, token);
  console.log(response);
  if (response.status == true) {
    go("/admin");
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function GetUsers(setusers:any | [],mode:string | null) {
     let token = localStorage.getItem("token");
    //  token = JSON.stringify(token);
     useEffect(()=>{
       const Get = async () =>{
        const res = await  AllUB(token,mode);
          setusers(res.user);
         console.log(res);
       }
      
       Get();
     },[])
    
         return null;
    //  return response.user;
} 
// export async function UsersGet(setusers:any | [])