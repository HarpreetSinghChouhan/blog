import { Box, Typography } from "@mui/material";

export default function BlogContent1({content}:{content:string | null}){
     
    return(
        <>
        <Box>
          {content && (
            <Typography component={'div'} variant="body2" dangerouslySetInnerHTML={{ __html:content}} />
          )}   
        </Box>
        </>
    )
}