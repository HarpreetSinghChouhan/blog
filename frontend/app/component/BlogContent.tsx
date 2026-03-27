
// "use client"
import { Box } from "@mui/material";
import Image from "next/image";
// import { use, useState } from "react";

export default function BlogContent(){
  const url =  process.env.LARAVAL_IMAGES
  console.error(url);

    // const [content,setcontent] = useState<any>([]);
     return(
        <>
        <Box>
          {/* {content && (
            // <Image src={`${url}`+content.image} width={100} height={100} alt="image Blog Image" />  
           <img src={`${url}`+content.image} alt="Blog Image" />
          )} */}
        </Box>
        </>
     )
}