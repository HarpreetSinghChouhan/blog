import { Box, Typography } from "@mui/material";

export default function BlogFooter({footer}:{footer:String | null}){
    return(
        <>
        <Box >
            { footer &&(
                <Typography component={'div'} variant="body1"> {footer} </Typography>
            )}
        </Box>
        </>
    )
}