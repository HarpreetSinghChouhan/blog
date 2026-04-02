"use client"
import { Box, Container, TextField } from "@mui/material";
import EmailVerification from "../component/admin/EmailVerify";
import { useState } from "react";

export default function EmailVerify(){
    const [form,setform] = useState({
        email:"",
    })
  return (
    <>
     <Container maxWidth={'md'} >
        <Box component={'form'} > 
            
            {/* <TextField  name="email" type="email" fullWidth value={form.email}  /> */}
        </Box>
     </Container>
    </>
  )    
}