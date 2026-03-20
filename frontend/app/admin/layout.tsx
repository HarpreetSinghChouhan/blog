import { Box } from "@mui/material";
import DrawerComponent from "../component/DrawerComponent";
import AppBar1 from "../component/AppBar";
import { settabvalue, tabpanelv, tabvalue } from "./type";
import { TabProvider } from "./context/TabContext";
// import { TabProvider } from "./context/tabcontext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TabProvider  >
        <Box display={"flex"}>
        <DrawerComponent />
        <Box width={"100%"}>
          <AppBar1 />
        
            {/* {tabpanelv.map((tab) =>
                   tab.id === tabvalue ? (
                     <Box key={tab.id}>{tab.value}</Box>
                   ) : null
                 )} */}
            {children}
        </Box>
      </Box>
      </TabProvider>
    </>
  );
}
