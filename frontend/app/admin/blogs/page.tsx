import AppBar1 from "@/app/component/AppBar";
import { Box, Table, Typography } from "@mui/material";

export default function Blogs(){
    return(
       <>
       <Box sx={{minHeight:"100vh",backgroundColor:"#eef0f2"}} >
          <AppBar1 />
           <Typography variant="h5" component={'div'} sx={{textAlign:"center",my:4}} > Welcome One Blogs page  </Typography>
           <Box sx={{display:"flex"}} >
             {/* <Table>
                  
             </Table> */}
           </Box>
       </Box>
      
       </> 
    )
}