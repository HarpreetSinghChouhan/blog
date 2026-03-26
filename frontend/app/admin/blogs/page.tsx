"use client"
import { Blog } from "@/app/AuthValidator";
import TableMenuAdmin from "@/app/component/admin/TableMenu";
import AppBar1 from "@/app/component/AppBar";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
 export const stripHtml = (html:any) => {
  if (typeof window === "undefined") return html; // SSR safety
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export default function Blogs(){
  const [blogs,setblogs]= useState<any[]>([])
 
    const res = Blog(setblogs,"allblogs");
    return(
       <>
       <Box sx={{minHeight:"100vh",backgroundColor:"#eef0f2"}} >
          <AppBar1 />
           <Typography variant="h5" component={'div'} sx={{textAlign:"center",my:4}} > Welcome One Blogs page  </Typography>
           <Box sx={{display:"flex" , px:4}} >
             <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell> Id </TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell> Content </TableCell>
                      <TableCell>Footer</TableCell>
                      <TableCell>Bloger</TableCell>
                      <TableCell>Created_at</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                   { blogs && (
                       blogs.map((blog:any,i:number)=>(
                        <TableRow key={i} >
                            <TableCell>{i+1}</TableCell>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{stripHtml(blog.content)}</TableCell>
                            <TableCell>{blog.bloger_id}</TableCell>
                            <TableCell>{blog.footer}</TableCell>
                            <TableCell>{new Date(blog.created_at).toLocaleString()  }</TableCell>                            
                            <TableCell>{blog.status}</TableCell>
                            <TableCell><TableMenuAdmin blog={blog} /></TableCell>
                        </TableRow>
                       ))
                   )}
                  </TableBody>
             </Table>
           </Box>
       </Box>
       </> 
    )
}