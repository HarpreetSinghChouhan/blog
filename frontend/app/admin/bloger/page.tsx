"use client"
import { GetUsers } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import TableBody1 from "@/app/component/TableBody";
import { Box, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

export default function Bloger(){
   const [bloger,setbloger] = useState<any[]>([]);
   GetUsers(setbloger,"bloger");
    return(
       <>
       
       <Typography variant="h5" component={'div'} sx={{textAlign:"center",my:4}} > Welcome One Bloger page  </Typography>
          <Box sx={{px:3}} >
             <Table >
                  <TableHead  >
                      <TableRow sx={{width:"100%"}} >
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Create AT</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody1 users={bloger} />
                </Table>
          </Box>
       </> 
    )
}