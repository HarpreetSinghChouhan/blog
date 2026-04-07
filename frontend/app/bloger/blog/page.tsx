import AppBar1 from "@/app/component/AppBar";
import ButtonClick from "@/app/component/ButtonClick";
import { Box, Typography } from "@mui/material";

export default function Blog() {
    return (<>

        <Box sx={{ display: "flex", justifyContent: "space-between", px: 10 }}  >
            <Typography component={'div'} sx={{ my: 3, textAlign: "center" }} variant="h5" > WelCome Blog  Page   </Typography>
            <Typography sx={{ mt: 2 }} > <ButtonClick buttonName="Add Blog" route="bloger/addblog" /> </Typography>
        </Box>
    </>)
}