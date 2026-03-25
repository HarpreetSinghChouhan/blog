import { json } from "stream/consumers";
import { resourceLimits } from "worker_threads";
interface props{
    data:any,
    token:string | null,
    url:string ,
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
}