"use client";
import { Box, LinearProgress, Typography } from "@mui/material";
import { TabProvider, useTab1 } from "./context/Provider";
import { useAuthCheckBloger } from "../AuthValidator";
import AppBar1 from "../component/AppBar";
import DrawerComponent from "../component/DrawerBloger";

// 1. MOVE all the logic that uses the context into this internal component
function LayoutContents({ children }: { children: React.ReactNode }) {
  useAuthCheckBloger();
  
  // This will now work because it is nested INSIDE TabProvider below
  const { isImporting, progress, timeLeft } = useTab1();

  return (
    <Box display="flex" sx={{ minHeight: "100vh" }}>
      <DrawerComponent />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AppBar1 />

        {isImporting && (
          <Box sx={{ width: '100%', bgcolor: 'white', p: 1, borderBottom: '1px solid #e0e0e0' }}>
            <LinearProgress variant="determinate" value={progress} />
            <Box display="flex" justifyContent="space-between" mt={0.5}>
              <Typography variant="caption">Processing: {progress}%</Typography>
              <Typography variant="caption">Ends in: {timeLeft}s</Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, backgroundColor: "#f0f2f5" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

// 2. The Main Layout ONLY provides the context
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabProvider>
      <LayoutContents>{children}</LayoutContents>
    </TabProvider>
  );
}
