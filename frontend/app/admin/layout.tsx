"use client";
import { Box } from "@mui/material";
import DrawerComponent from "../component/DrawerComponent";
import AppBar1 from "../component/AppBar";
import { TabProvider } from "./context/TabContext";
import { useAuthCheckBloger } from "../AuthValidator";

function AdminContent({ children }: { children: React.ReactNode }) {
  useAuthCheckBloger();
  return (
    <Box display="flex" sx={{ minHeight: "100vh" }}>
      <DrawerComponent />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <AppBar1 />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            backgroundColor: "#f0f2f5",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
  
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabProvider>
      <AdminContent>{children}</AdminContent>
    </TabProvider>
  );
}