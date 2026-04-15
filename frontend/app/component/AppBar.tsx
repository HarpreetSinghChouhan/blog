"use client"
import { Alarm,AccessTime,  CalendarMonthTwoTone, ChatBubbleOutline, Search,DashboardOutlined, Menu } from "@mui/icons-material";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { TabContext } from "../admin/context/TabContext";
import { BloggerTabContext } from "../bloger/context/Provider";
import { usePathname } from "next/navigation";

export default function AppBar1() {
    const buttoncolor = { BorderRadius:"10px","&;hover":{backgroundColor:"purple",}}; 
    const pathname = usePathname();
    const adminContext = useContext(TabContext);
    const blogerContext = useContext(BloggerTabContext);
    const header = [{id:0,label:"Search",icon:<Search />,buttoncolor:buttoncolor},
      {id:1,label:"Alarm",icon:<Alarm />,buttoncolor:buttoncolor},
      {id:2,label:"Calendar",icon:<CalendarMonthTwoTone />,buttoncolor:buttoncolor},
      {id:3,label:"Chat",icon:<ChatBubbleOutline />,buttoncolor:buttoncolor },
      {id:4,label:"Access Time",icon:<AccessTime />,buttoncolor:buttoncolor},
      {id:5,label:"Dashboard",icon:<DashboardOutlined />,buttoncolor:buttoncolor},
      {id:6,label:"Logout",icon:<LogoutButton />,buttoncolor:buttoncolor}]
    // Choose the appropriate toggle function based on the route
    const toggleDrawer = pathname.startsWith("/admin") 
      ? adminContext?.toggleDrawer 
      : blogerContext?.toggleDrawer;
  return (
    <>
      <AppBar
        position="relative"  
      sx={{
        backgroundColor: "#fafafa",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        // zIndex: (theme) => theme.zIndex.drawer +1 , 
      }}
      >
        <Toolbar>
            <IconButton onClick={toggleDrawer} sx={{ mr: 1 }}>
          <Menu />
        </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
              <ListItem>
                 {header && header.map((item)=>{
                  return(
                    <ListItemButton key={item.id} sx={item.buttoncolor}  >
                      <Typography variant="body1">
                        {item.icon}
                      </Typography>
                    </ListItemButton>
                  )
                 })}
                
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
