
import { json } from "stream/consumers";
import { resourceLimits } from "worker_threads";
interface Props{
    data:any,
    token:string | null,
    url:string | null ,
}
interface Onedele{
    id:String | null,
    token: String | null,
    url:String | null,
}
interface prop1 {
    form:any,
    token:string | null,
}
const api = process.env.LARAVAL_API || "http://127.0.0.1:8000/api";
export async function Logout(token: any) {
    const response = await fetch(`${api}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
    const res = await response.json();
    return res;
};
export default async function AdminRegister1(data: any) {
    const response = await fetch(`${api}/adminregister`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}
export async function AdminLogin1(data: any) {
    const response = await fetch(`${api}/adminlogin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}
export async function RegisterUserBloger(data: any, token: string | null) {
    const response = await fetch(`${api}/registerub`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}
export async function AllUB(token: string | null,mode:string | null) {
    const response = await fetch(`${api}/${mode}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
             
            "Authorization": `Bearer ${token}`
        },
     })
      const res = response.json();
      return res;
}

export async function LoginPage(data: any,url:string| null) {
    const response = await fetch(`${api}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}
export async function blogCreation(data:any, token ?: string | null, url?: string){
    const response = await fetch(`${api}/${url}`, {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:data,
    })
    const res = await response.json();
    return res;
}export async function ChangeStatus(data : any,token:string | null){
    const response = await fetch(`${api}/blogerchange`,{
        method: "PUT",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        body:data,
    })
    const res = await response.json();
    return res;
}
export async function Delete(data:any,token:string | null){
    const response = await fetch(`${api}/deleteblog`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${token}`,
            "Accept":"application/json",
        },
        body:data,
    })
    const res = response.json();
    return res;
}
export async function Blogfind(id:String | null,token:String | null){
  const res = await fetch(`${api}/blog/${id}`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`,
        "Accept":"application/json",
    },
  });
  return await res.json();
};
export async function OneDelete({id,token,url}:Onedele){
    const response = await fetch(`${api}/${url}/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${token}`,
            "Accept":"application/json",            
        },
    })
    const res = response.json();
    return res;
} 
export async function AllDb({data,token,url}:Props) {
     const response = await fetch(`${api}/${url}`,{
        method:"PUT",
        headers:{ 
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body:data,
     })
     const res = await response.json();
     return res;
}
export async function AuthCheker(token:String | null) {
    const response = await fetch(`${api}/authication`,{
        method:"Get",
        headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`,
        }     
    })
    const res = await response.json();
    return res;
    
}
export async function blogEditer({form,token}:prop1){
    const response =  await fetch(`${api}/blogedit`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`
        },
         body:form
    }) 
    const res = await response.json();
    return res;
}
export async function FindUser1(id:any,token:string | null) {
    const response = await fetch(`${api}/user/${id}`,{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`
        }
        
    });
    const res = await response.json();
    return res;
    
}