// "use client"
import AdminRegister1, { AdminLogin1, AllDb, AllUB, AuthCheker, blogCreation,  LoginPage, OneDelete, RegisterUserBloger } from "@/lib/api";
import { ListItem } from "@mui/material";
import Error from "./script";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
 interface Props {
  form:any,
  go:Function,
  seterror:any
 } 

export default async function Register1(
  go: Function,
  seterror: any,
  form: any,
) {
  //   console.log(form);/

  const response = await AdminRegister1(form);
  if (response.status == true) {
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
    localStorage.setItem("token",token);
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
  // console.log(response);
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
        //  console.log(res);
       }
      
       Get();
     },[])
    
         return null;
    //  return response.user;
} 
export async function Login2(data: any, go: Function, seterror: any) {
  const response = await LoginPage(data,"login");
  //   console.log(response);
  if (response.status == true) {
    let token = response.token;
    localStorage.setItem("token",token);
    document.cookie = `token=${token}; path=/`;
    if(response.role == "bloger"){
      go("/bloger");
    }
    else if(response.role == "user"){
      go("/user");
    }
    
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function blogCreate(data: any, go: Function, seterror: any) {
  const token = localStorage.getItem("token");
  const response = await blogCreation(data,token,"blogcreate");
    console.log(response);
  if (response.status == true) {
     go("/bloger/status")
    if(response.role == "bloger"){
      go("/bloger");
    }
    else if(response.role == "user"){
      go("/user");
    }
    
    return null;
  } else {
    Error(response, seterror);
  }
}
export function Blog(setblog: any,mode:string |null){
   const router = useRouter();
    useEffect(() => {
      
        const token = localStorage.getItem("token");
      if (!token) return;
      const GetData = async () => {
        const response = await AllUB(token,mode);
        //  console.log("Api response ");
        if(response.message == "Unauthorized"){
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
         setblog(response.blogs);
        //  console.log(response);
      };
      GetData();
    },[]);
    return null;
}
// export function Blogfind(form:any,setblog:any,mode:any){
//   useEffect(()=>{
//     const token = localStorage
//   })
// }
export async function Delete(url:string | null,id:any){
  const token = localStorage.getItem("token");
   if(!token) return;
   const res = await OneDelete({id,token,url});
    return res;
  
}
export async function UserBlogerEdit({form,go,seterror}:Props) {
   const token = localStorage.getItem("token");
   if(!token) return;
   const data =  form;
   const url = "edituserblog";
   const res = await AllDb({data,token,url} );
    console.log(res);
}
export function useAuthCheckBloger() {
  const router = useRouter();
   
  useEffect(() => {
    const token = localStorage.getItem("token");

    const get = async () => {
      const response = await AuthCheker(token);

      if (response.message === "Unauthorized") {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
    };

    get();
  }, [router]);
}
export function blogEdit({form,go,seterror}:Props){
 const token = localStorage.getItem("token");
}