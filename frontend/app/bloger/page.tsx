"use client"
import { Box, Button, Paper, Typography } from "@mui/material";
import DrawerComponent from "../component/DrawerBloger";
import AppBar1 from "../component/AppBar";
import { ArrowBack } from "@mui/icons-material";
import ButtonClick from "../component/ButtonClick";
import TableComponent from "../component/bloger/TableComponent";
import { useState } from "react";
import { Blog } from "../AuthValidator";

export default function Blogs() {
    const [blogs,setblogs] = useState<any[]>([]);
      const response = Blog(setblogs,"blogs");
  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "#eef0f2" }}>
        <AppBar1 />

        <Paper elevation={0} sx={{ bgcolor: "#eef0f2" }}>
          <Box
            sx={{display: "flex",justifyContent: "space-between",mx: 4,px: 4,py: 2,}}>
            <Typography mt={1}><ArrowBack /> Add Blog</Typography>
            <Box>
              <ButtonClick buttonName="Add Blog" route="bloger/addblog" />
            </Box>
          </Box>
            <Box sx={{p:3}} >
           <TableComponent blogs={blogs} setblogs={setblogs} />

            </Box>
        </Paper>
      </Box>
    </>
  );
}
