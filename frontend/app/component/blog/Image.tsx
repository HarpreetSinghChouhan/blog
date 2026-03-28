import { Box } from "@mui/material";
import Image from "next/image";
export default function BlogImage({src,title}:any){
     const image = src;
    //  const url = process.env.LARAVEL_IMAGE
    return (
        <>
         <Box  >
            {image &&(
                <Image src={image} className="mx-auto"  width={700} height={500} alt="Blog" unoptimized    />
                 
            )}
         </Box>
        </>
    )
}