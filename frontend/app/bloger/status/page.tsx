"use client"
import { Blog } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import TableComponent from "@/app/component/bloger/TableComponent";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

export default function Status(){
    const [blogs,setblogs] = useState<any[]>([]);
   Blog(setblogs,"blogs");
    return(
    <>
     <Box sx={{minHeight:"100vh",bgcolor:"#eef0f2"}} >  
        <AppBar1 />
        <Typography  component={'div'} sx={{my:3,textAlign:"center"}} variant="h5" > WelCome Blog Status Page   </Typography> 
       <Box sx={{px:4}}>
       <TableComponent blogs={blogs} setblogs={setblogs}  />
       </Box>
       </Box>
    </>
)
}