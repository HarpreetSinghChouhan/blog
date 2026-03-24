"use client";
import { Notes, Group, PendingActions, Dashboard } from "@mui/icons-material";
import { createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

export const tabpanelv = [
  { id: 0, name: "Dashboard", value: <Dashboard />,route: "/bloger" },
  { id: 1, name: "blog",      value: <Notes />,route: "/bloger/blog" },
  { id: 2, name: "Add Blog",      value: <Group />,route: "/bloger/addblog" },
  { id: 3, name: "Status",    value: <PendingActions />,route: "/bloger/status" },
];

type TabContextType = {
  tabvalue: number;
  settabvalue: (v: number) => void;
};

const TabContext = createContext<TabContextType>({
  tabvalue: 0,
  settabvalue: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  // derive active tab from current URL instead of local state
  const tabvalue = tabpanelv.find((t) => t.route === pathname)?.id ?? 0;

  const settabvalue = (v: number) => {
    const tab = tabpanelv.find((t) => t.id === v);
    if (tab) router.push(tab.route);
  };

  return (
    <TabContext.Provider value={{ tabvalue, settabvalue }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => useContext(TabContext);