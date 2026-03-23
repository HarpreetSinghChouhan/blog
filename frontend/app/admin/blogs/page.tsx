import AppBar1 from "@/app/component/AppBar";
import { Box, Typography } from "@mui/material";

export default function Blogs(){
    return(
       <>
       <Box sx={{minHeight:"100vh",backgroundColor:"#d1d1d1"}} >
          <AppBar1 />
           <Typography variant="h5" component={'div'} sx={{textAlign:"center"}} > Welcome One Blogs page  </Typography>
       </Box>
      
       </> 
    )
}