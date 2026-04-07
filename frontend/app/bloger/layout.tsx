"use client"
import { Box } from "@mui/material";
import { TabProvider } from "./context/Provider";
import { useAuthCheckBloger } from "../AuthValidator";
import { useRouter } from "next/navigation";
import AppBar1 from "../component/AppBar";
import DrawerBloger from "../component/DrawerBloger";
import DrawerComponent from "../component/DrawerBloger";

 function LayoutPage({children}:{children:React.ReactNode}){
    const bloger = useAuthCheckBloger();
    return(
        <Box display="flex" sx={{ minHeight: "100vh" }}>
             <DrawerComponent />
             <Box
               sx={{
                 flexGrow: 1,
                 display: "flex",
                 flexDirection: "column",
                 minWidth: 0,
               }}
             >
               <AppBar1 />
               <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5" }}>
                 {children}
               </Box>
             </Box>
           </Box>
    )
}
export default function Layout({children}:{children:React.ReactNode}){
    return(
        <TabProvider>
            <LayoutPage>{children}</LayoutPage>
        </TabProvider>
    )
}