"use client"
import { FindUser } from "@/app/AuthValidator";
import { useState } from "react";
import EditUser from "./EditUser";
 
interface Form{
    name:String,
    email:String,
    role:String,

}
export default function FormUser({id}:any){
    console.log(id);
    const [form,setform]= useState<Form>({
        name:"",
        email:"",
        role:""
    });
    
    FindUser({id,setform});
    return (
        <>
               <EditUser id={id} form={form} setform={setform} />
        </>
    )
}