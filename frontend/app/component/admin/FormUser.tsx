"use client"
import { FindUser } from "@/app/AuthValidator";
import { useEffect, useState } from "react";
import EditUser from "./EditUser";
const api  = process.env.LARAVAL_API
interface Form {
    name: string,
    email: string,
    role: string,
    password:string,

}
// };
export default function FormUser({ id }:{id: string | number}) {
    // console.log(id);
    
    const [form, setform] = useState<Form>({
        name: "",
        email: "",
        role: "user",
        password:"",
    });
        FindUser({id,setform});
    
    return (
        <>
            <EditUser id={id} form={form} setform={setform} />
        </>
    )
}