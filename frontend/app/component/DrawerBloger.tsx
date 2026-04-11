"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AddCircleOutlined,
  Dashboard,
  PendingActionsOutlined,
  PendingOutlined,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { useTab1 } from "../bloger/context/Provider";
import { AuthChecker1 } from "./script/Authvalidation";

const DRAWER_WIDTH = 260;

const navItems = [
  {
    id: 0,
    label: "Dashboard",
    path: "/bloger",
    icon: <Dashboard fontSize="small" />,
  },
  {
    id: 1,
    label: "Blog",
    path: "/bloger/blog",
    icon: <PendingOutlined fontSize="small" />,
  },
  {
    id: 2,
    label: "Add Blog",
    path: "/bloger/addblog",
    icon: <AddCircleOutlined fontSize="small" />,
  },
  {
    id: 3,
    label: "Status",
    path: "/bloger/status",
    icon: <PendingActionsOutlined fontSize="small" />,
  },
];

export default function DrawerComponent() {
  const { settabvalue, drawerOpen } = useTab1();
  // const [value, setValue] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const [response, setresponse] = useState(false);
  const [user, setuser] = useState<any>();
  useEffect(() => {
    const get = async () => {
      setresponse(true);
      console.log(user);
    };
    get();
  }, []);
  const handleSelect = (id: number) => {

    settabvalue(id);
  };

  return (
    <>
      {response && (<AuthChecker1 setuser={setuser} />)}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? DRAWER_WIDTH : 0,
          transition: "width 0.7s ease",
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            background: "#eef0f2",
            // background : linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%),
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
          },
        }}
      >
        {/* App Identity */}
        <Box
          sx={{
            px: 2.5,
            pt: 3.5,
            pb: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 46,
              height: 46,
              borderRadius: "100%",
              background: "#5ce0ff",
              fontSize: 15,
              fontWeight: 700,
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              boxShadow: "0 2px 12px rgba(10,132,255,0.4)",
            }}
          >
            {user && (
              <span>
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </Avatar>
          <Box>
            <Typography
              sx={{
                color: "Black",
                fontFamily:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "-0.2px",
                lineHeight: 1.2,
              }}
            >
              Bloger Panel
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontFamily:
                  "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 11,
              }}
            >
              Workspace
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

        <Typography
          sx={{
            px: 2.5,
            pt: 2.5,
            pb: 0.5,
            color: "black",
            fontFamily:
              "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}
        >
          Navigation
        </Typography>

        <List sx={{ px: 1.5, pt: 0.5, flexGrow: 1 }} disablePadding>
          {navItems.map((item) => {
            const isActive =
              item.path === "/bloger"
                ? pathname === item.path
                : pathname.startsWith(item.path);

            return (
              <ListItemButton
                key={item.id}
                onClick={() => handleSelect(item.id)}
                sx={{
                  borderRadius: "10px",
                  mb: 0.5,
                  px: 1.5,
                  py: 1,
                  minHeight: 44,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(10,132,255,0.28) 0%, rgba(10,132,255,0.14) 100%)"
                    : "transparent",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(135deg, rgba(10,132,255,0.34) 0%, rgba(10,132,255,0.18) 100%)"
                      : "rgba(255,255,255,0.06)",
                  },
                  "&::before": isActive
                    ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      height: "60%",
                      width: 5,
                      borderRadius: "0 3px 3px 0",
                      background: "#0058ff",
                    }
                    : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: isActive ? "#0A84FF" : "black",
                    transition: "color 0.2s ease",
                    "& svg": { fontSize: 18 },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily:
                        "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: 13.5,
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "-0.1px",
                      color: isActive ? "#fff" : "black ",
                      transition: "all 0.2s ease",
                    },
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#0A84FF",
                      boxShadow: "0 0 6px rgba(10,132,255,0.8)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>

        {/* Footer */}
        <Box sx={{ px: 2.5, pb: 3 }}>
          <Divider sx={{ borderColor: "rgba(250,20,25,0.1)", mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 46,
                height: 46,
                borderRadius: "100%",
                background: "#5ce0ff",
                fontSize: 15,
                fontWeight: 600,
              boxShadow: "0 2px 12px rgba(10,132,255,0.4)",
              }}
            >
              {user && (
                <span>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily:
                    "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user && (
                  <span>
                    {user.name}
                  </span>
                )}
              </Typography>
              <Typography
                sx={{
                  fontFamily:
                    "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 10.5,
                }}
              >
                {user && (
                  <span>
                    {user.email}
                  </span>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
