"use client"
import { Blog } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import TableComponent from "@/app/component/bloger/TableComponent";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import AddBlog from "../addblog/page";
import ButtonClick from "@/app/component/ButtonClick";

export default function Status(){
    const [blogs,setblogs] = useState<any[]>([]);
   Blog(setblogs,"blogs");
    return(
    <>
    
        <Box sx={{display:"flex",justifyContent:"space-between",px:10}}  >
            <Typography  component={'div'} sx={{my:3,textAlign:"center"}} variant="h5" > WelCome Blog Status Page   </Typography> 
             <Typography sx={{mt:2}} > <ButtonClick buttonName="Add Blog" route="bloger/addblog" /> </Typography>
        </Box>
       <Box sx={{px:4}}>
       <TableComponent blogs={blogs} setblogs={setblogs}  />
       </Box>
    </>
)
}