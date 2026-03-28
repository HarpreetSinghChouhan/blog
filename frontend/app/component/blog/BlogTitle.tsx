import { Typography } from "@mui/material";

export default function BlogTitle({title}:{title:String}){
    
    return(
        <>
       
        {title && (
             <Typography component={'p'} variant="h4" >
                {title}
                 </Typography>
        )}
       
        </>
    )
}