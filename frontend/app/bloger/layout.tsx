"use client";
import { Box } from "@mui/material";
import { TabProvider } from "./context/Provider";
import { useAuthCheckBloger } from "../AuthValidator";
import AppBar1 from "../component/AppBar";
import DrawerComponent from "../component/DrawerBloger";

function LayoutPage({ children }: { children: React.ReactNode }) {
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
      <LayoutPage>{children}</LayoutPage>
    </TabProvider>
  );
}