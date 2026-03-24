"use client";
import {
  Box,
  Button,
  Menu,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tabpanelv, useTab } from "./context/TabContext";
import AppBar1 from "../component/AppBar";
import { AddCircleOutline } from "@mui/icons-material";
import { navigation } from "@/lib/routes";
import { GetUsers } from "../AuthValidator";
import { useState } from "react";
import TableMenu from "../component/TableManu";
import TableBody1 from "../component/TableBody";
// import {  tabpanelv, useTab } from "./context/TabContext";

export default function Admin() {
  const [users, setusers] = useState<any[]>([]);
  GetUsers(setusers,"allusers");
  const { tabvalue } = useTab();
  const { go } = navigation();
  const handleAddUserBloger = () => {
    // console.log("Hello Every One")
    go("admin/addblogeruser");
  };
  // function TableMenu({ user }: any) {
  
  // const handleEdit = () => {
  //   console.log("Edit user:", user.id);
  // };
// }

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* <GetUsers /> */}
      <AppBar1 />
      <Paper elevation={0}>
        <Box
          sx={{
            display: "flex",
            p: 3,
            m: 3,
            bgcolor: "white",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" component={"b"}>
              Add User/Bloger
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={() => {
                handleAddUserBloger();
              }}
              variant="outlined"
              sx={{ px: 4 }}
            >
              {" "}
              <AddCircleOutline sx={{ mr: 2 }} /> Add{" "}
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ p: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
         <TableBody1 users={users} />
          
        </Table>
      </Box>
    </Box>
  );
}
