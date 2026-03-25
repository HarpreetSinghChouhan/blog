// "use client"
import { Box, Button, Paper, Typography } from "@mui/material";
import DrawerComponent from "../component/DrawerBloger";
import AppBar1 from "../component/AppBar";
import {  ArrowBack } from "@mui/icons-material";
import ButtonClick from "../component/ButtonClick";


export default function Blog() {
  return (
    <>
      <Box sx={{ minHeight: "100vh",bgcolor:"#eef0f2"
       }}>
        <AppBar1 />
        {/* <Typography
          component={"div"}
          sx={{ my: 3, textAlign: "center" }}
          variant="h5"
        >
          {" "}
          WelCome Blog Status Page{" "}
        </Typography> */}
        <Paper  elevation={0} sx={{bgcolor:"#eef0f2"}} >
            <Box  sx={{display:"flex",justifyContent:"space-between",mx:4,px:4 ,py:2}} >
          <Typography mt={1} > <ArrowBack /> Add Blog</Typography>
          <Box>
            <ButtonClick buttonName="Add Blog" route="bloger/addblog"  />
          </Box>
        </Box>
        </Paper>
      </Box>
    </>
  );
}
