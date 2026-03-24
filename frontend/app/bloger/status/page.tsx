import AppBar1 from "@/app/component/AppBar";
import { Box, Typography } from "@mui/material";

export default function Status(){
    return(
    <>
     <Box sx={{minHeight:"100vh",bgcolor:"#eef0f2"}} >  
        <AppBar1 />
        <Typography  component={'div'} sx={{my:3,textAlign:"center"}} variant="h5" > WelCome Blog Status Page   </Typography> </Box>

    </>
)
}