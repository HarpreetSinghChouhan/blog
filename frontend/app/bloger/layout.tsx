import { Box } from "@mui/material";
import { TabProvider } from "./context/Provider";
import DrawerComponent from "../component/DrawerBloger";

export default function Layout({children}:{children:React.ReactNode}){
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