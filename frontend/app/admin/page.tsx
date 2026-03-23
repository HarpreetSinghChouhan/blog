'use client'
import { Box } from "@mui/material";
import { tabpanelv, useTab } from "./context/TabContext";
import AppBar1 from "../component/AppBar";
// import {  tabpanelv, useTab } from "./context/TabContext";

export default function Admin() {
  const { tabvalue } = useTab();

  return (
    <Box  sx={{backgroundColor:"#d1d1d1",minHeight:"100vh"}} >
        <AppBar1 />
       <Box  >
          

       </Box>
            
        
    </Box>
  );
}