"use client"
import { GetUsers } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import TableBody1 from "@/app/component/TableBody";
import { Box, Table, TableCell, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export default function Users() {
  const [users, setusers] = useState<any[]>([])
  GetUsers(setusers, "users");
  return (
    <>

      <Typography variant="h5" component={'div'} sx={{ textAlign: "center", my: 3 }} > Welcome On User page  </Typography>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Create AT</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody1 users={users} setusers={setusers} />
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={5} >Total</TableCell>
            <TableCell >100</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>

    </>
  )
}
