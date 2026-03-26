import { TableRow, TableCell,TableBody, TableFooter } from "@mui/material";
import TableMenu from "./TableManu";
import { useState } from "react";
import Users from "../admin/user/page";
import { stripHtml } from "../admin/blogs/page";

export default function  TableBodyBloger({blogs}:any){
    // const [user1,setusers] = useState<any[]>([users])
    console.log(blogs);
    return(
       <>
        <TableBody>
            {blogs.map((user:any,index:any) => (
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
                <TableCell> <TableMenu user={user} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>

          </TableFooter> */}
       </>
    )
}