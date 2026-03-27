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
import { useTab } from "../admin/context/TabContext";

export default function AppBar1() {
    const buttoncolor = { BorderRadius:"10px","&;hover":{backgroundColor:"purple",}}; 
  const { toggleDrawer } = useTab();
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
                
                <ListItemButton sx={{ BorderRadius:"10px","&;hover":{backgroundColor:"purple",}}}>
                  <Typography variant="body1">
                    <Search />
                  </Typography>
                </ListItemButton>
                <ListItemButton sx={buttoncolor}>
                  <Typography variant="body1">
                    <Alarm />
                  </Typography>
                </ListItemButton>
                <ListItemButton sx={buttoncolor}  >
                  <Typography variant="body1">
                    <CalendarMonthTwoTone />
                  </Typography>
                </ListItemButton>
                <ListItemButton sx={{}} disabled>
                  <Typography variant="body1">
                    <ChatBubbleOutline />
                  </Typography>
                </ListItemButton>
                <ListItemButton sx={buttoncolor}  >
                  <Typography variant="body1">
                    <AccessTime />
                  </Typography>
                </ListItemButton>
                  <ListItemButton sx={buttoncolor}  >
                  <Typography variant="body1">
                    <DashboardOutlined />
                  </Typography>
                </ListItemButton>
                <ListItemButton sx={{ BorderRadius:"10px","&;hover":{backgroundColor:"purple",}}}>
                  <Typography variant="body1">
                    <LogoutButton />
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
