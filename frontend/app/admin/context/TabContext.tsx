"use client";
import { Notes, Group, PendingActions, Dashboard } from "@mui/icons-material";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getEcho } from "@/lib/echo";

export const tabpanelv = [
  { id: 0, name: "Dashboard", value: <Dashboard />,       route: "/admin" },
  { id: 1, name: "blog",      value: <Notes />,           route: "/admin/blogs" },
  { id: 2, name: "user",      value: <Group />,           route: "/admin/user" },
  { id: 3, name: "bloger",    value: <PendingActions />,  route: "/admin/bloger" },
];

type TabContextType = {
  tabvalue: number;
  settabvalue: (v: number) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
  progress: number;
  setProgress: (v: number) => void;
  timeLeft: number;
  setTimeLeft: (v: number) => void;
  isImporting: boolean;
  setIsImporting: (v: boolean) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(true);
  
  // Progress States
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    const echo = getEcho();
    if (!echo) return;

    const channel = echo.channel('import-status');
    
    channel.listen('.import.progress', (data: { progress: number, timeLeft: number }) => {
      console.log('Import progress received:', data);
      setProgress(data.progress);
      if (data.timeLeft !== undefined) setTimeLeft(data.timeLeft);
      
      // Auto-hide progress bar when finished
      if (data.progress >= 100) {
        setTimeout(() => {
          setIsImporting(false);
          setProgress(0);
        }, 2000);
      }
    });

    return () => {
      echo.leaveChannel('import-status');
    };
  }, []);

  const tabvalue = tabpanelv.find((t) => t.route === pathname)?.id ?? 0;

  const settabvalue = (v: number) => {
    const tab = tabpanelv.find((t) => t.id === v);
    if (tab) router.push(tab.route);
  };

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <TabContext.Provider value={{ 
        tabvalue, settabvalue, drawerOpen, toggleDrawer,
        progress, setProgress, timeLeft, setTimeLeft, isImporting, setIsImporting 
    }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => {
    const context = useContext(TabContext);
    if (!context) throw new Error("useTab must be used within a TabProvider");
    return context;
};
