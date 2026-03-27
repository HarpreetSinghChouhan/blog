"use client";
import { Notes, Group, PendingActions, Dashboard } from "@mui/icons-material";
import { createContext, useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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
};

const TabContext = createContext<TabContextType>({
  tabvalue: 0,
  settabvalue: () => {},
  drawerOpen: true,
   toggleDrawer: () => {} 
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(true);

  // derive active tab from current URL instead of local state
  const tabvalue = tabpanelv.find((t) => t.route === pathname)?.id ?? 0;

  const settabvalue = (v: number) => {
    const tab = tabpanelv.find((t) => t.id === v);
    if (tab) router.push(tab.route);
  };
 const toggleDrawer = () => setDrawerOpen(prev => !prev);
  return (
    <TabContext.Provider value={{ tabvalue, settabvalue, drawerOpen,toggleDrawer }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => useContext(TabContext);