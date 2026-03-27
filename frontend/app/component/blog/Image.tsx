import { Box } from "@mui/material";

export default function BlogData(Imagerurl:String | null){
     const image = Imagerurl;
     const url = process.env.LARAVEL_IMAGE
    return (
        <>
         <Box>
            {image &&(
                <Image src={url+image}  />
      
            )}
         </Box>
        </>
    )
}