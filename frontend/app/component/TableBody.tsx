import { TableRow, TableCell,TableBody } from "@mui/material";
import TableMenu from "./TableManu";
import { useState } from "react";
import Users from "../admin/user/page";

export default function  TableBody1({users,setusers}:any){
    // const [user1,setusers] = useState<any[]>([users])
    // console.log(users);
    return(
        <TableBody>
            {  users && users.length>0 ?(
               users.map((user:any,index:any) => (
              <TableRow key={index}>
                <TableCell>{index +1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleString()}
                </TableCell>
                <TableCell> <TableMenu user={user} setusers={setusers} /></TableCell>
              </TableRow>
            ))
            ) :(
              <TableRow  >
                 <TableCell colSpan={6} >
                 nothing no have any blog
              </TableCell>

              </TableRow>
            )}
          </TableBody>
    )
}