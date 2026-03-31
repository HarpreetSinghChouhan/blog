"use client"
import { Box } from "@mui/material";
import { TabProvider } from "./context/Provider";
import DrawerComponent from "../component/DrawerBloger";
import { useAuthCheckBloger } from "../AuthValidator";
import { useRouter } from "next/navigation";

export default function Layout({children}:{children:React.ReactNode}){
    const bloger = useAuthCheckBloger();
    return(
        <>
        <TabProvider  >
            <Box display={"flex"} >
                <DrawerComponent />
                <Box width={"100%"} >
                    {children}
                </Box>
            </Box>
        </TabProvider>
        </>
    )
}