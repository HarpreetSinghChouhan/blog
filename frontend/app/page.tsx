import { AppBar, Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import AppBar1 from "./component/AppBar";

export default function Home() {
  return (
    <><Box  sx={{position:"sticky"}} >
   
     <AppBar1  />
   </Box>
      <Container sx={{minHeight:"100vh",alignContent:"center",textAlign:"center"}} >
        <Box>
          <Typography  variant="h5" >
            WellCome On Home Page 
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis harum commodi repudiandae provident asperiores, odit quia tempora, sint quibusdam blanditiis ullam ea deleniti quod rerum earum. Minima atque ipsam itaque?
          </Typography>
        </Box>
      </Container>
    </>
  );
}
