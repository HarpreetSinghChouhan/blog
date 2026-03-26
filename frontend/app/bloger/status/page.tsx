"use client"
import { Blog } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import TableBodyBloger from "@/app/component/TableBodybloger";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

export default function Status(){
    const [blogs,setblogs] = useState<any[]>([]);
    const response = Blog(setblogs,"blogs");
    return(
    <>
     <Box sx={{minHeight:"100vh",bgcolor:"#eef0f2"}} >  
        <AppBar1 />
        <Typography  component={'div'} sx={{my:3,textAlign:"center"}} variant="h5" > WelCome Blog Status Page   </Typography> 
       <Box sx={{px:4

       }}>
         <Table  >
            <TableHead>
                <TableRow>
                    <TableCell> ID </TableCell>
                    <TableCell> Title </TableCell>
                    <TableCell> Footer </TableCell>
                    <TableCell> Content </TableCell>
                    <TableCell>Status </TableCell>
                    <TableCell>Action </TableCell>
                </TableRow>
            </TableHead>
            <TableBodyBloger blogs={blogs}  />
        </Table>
       </Box>
       </Box>
    </>
)
}