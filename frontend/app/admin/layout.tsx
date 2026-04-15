"use client";
import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import DrawerComponent from "../component/DrawerComponent";
import AppBar1 from "../component/AppBar";
import { TabProvider, useTab } from "./context/TabContext";
import { useAuthCheckBloger } from "../AuthValidator";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  useAuthCheckBloger();
  const { isImporting, progress, timeLeft } = useTab(); 
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
        {isImporting && (
          <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 1, borderBottom: 1, borderColor: 'divider' }}>
            <LinearProgress variant="determinate" value={progress} />
            <Box display="flex" justifyContent="space-between" mt={0.5}>
              <Typography variant="caption" color="text.secondary">
                Importing: {progress}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Approx. {timeLeft}s remaining
              </Typography>
            </Box>
          </Box>
        )}
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
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </TabProvider>
  );
}