"use client";
import { Notes, Group, PendingActions, Dashboard } from "@mui/icons-material";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getEcho } from "@/lib/echo";

export const tabpanelv = [
  { id: 0, name: "Dashboard", value: <Dashboard />, route: "/bloger" },
  { id: 1, name: "blog",      value: <Notes />,     route: "/bloger/blog" },
  { id: 2, name: "Add Blog",  value: <Group />,     route: "/bloger/addblog" },
  { id: 3, name: "Status",    value: <PendingActions />, route: "/bloger/status" },
];

type TabContextType = {
  tabvalue: number;
  settabvalue: (v: number) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
  // Progress states for blogger side
  progress: number;
  setProgress: (v: number) => void;
  isImporting: boolean;
  setIsImporting: (v: boolean) => void;
  timeLeft: number;
  setTimeLeft: (v: number) => void;
};

export const BloggerTabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(true);
  
  // New states for progress
  const [progress, setProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const echo = getEcho();
    if (!echo) return;

    const channel = echo.channel('import-status');
    
    channel.listen('.import.progress', (data: { progress: number, timeLeft: number }) => {
      console.log('Import progress received (Blogger):', data);
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
    <BloggerTabContext.Provider value={{ 
        tabvalue, settabvalue, drawerOpen, toggleDrawer,
        progress, setProgress, isImporting, setIsImporting, timeLeft, setTimeLeft
    }}>
      {children}
    </BloggerTabContext.Provider>
  );
}

// RENAME this to useTab (or check if your components use useTab1)
export const useTab1 = () => {
    const context = useContext(BloggerTabContext);
    if (!context) throw new Error("useTab uyuwtyuwetgdyu must be used within a TabProvider");
    return context;
};
