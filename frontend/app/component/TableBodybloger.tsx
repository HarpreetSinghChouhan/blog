import { TableRow, TableCell,TableBody, TableFooter, Table } from "@mui/material";
import { useState } from "react";
import Users from "../admin/user/page";
import { stripHtml } from "../admin/blogs/page";
import TableMenuBloger from "./bloger/TableMenuBloger";
import { navigation } from "@/lib/routes";

export default function  TableBodyBloger({blogs,setblogs}:any){
  const {go} = navigation();
  console.log(blogs);
    return(
       <>
        <TableBody>
            { blogs && blogs.length > 0 ?(
              blogs.map((user:any,index:any) => (
              <TableRow key={index}>
                <TableCell>{index +1}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.footer}</TableCell>
                <TableCell>{stripHtml(user.content)}</TableCell>
                <TableCell sx={{color:"green"}} >
                    {user.status}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleString()}
                </TableCell>
                <TableCell> <TableMenuBloger blog={user} setblogs={setblogs} go={go} /></TableCell>
              </TableRow>
            ))
            ):(
              <TableRow >
                    <TableCell colSpan={7} sx={{textAlign:"center"}} >
                          Empty blog
                    </TableCell>

              </TableRow>
            ) }
          </TableBody>
          {/* <TableFooter>

          </TableFooter> */}
       </>
    )
}