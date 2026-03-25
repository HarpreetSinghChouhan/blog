"use client"
import { AddCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { navigation } from "@/lib/routes";
type Props = {
  buttonName: string | null;
  route: string;
};
export default function ButtonClick({buttonName,route}:Props){ 
    const {go} = navigation(); 
    const clickhandle = () =>{
      console.log("hello Every One");
      go(`/${route}`);
         
    }
    return(
        <>
        
      <Button  variant="contained"  onClick={()=>{clickhandle()}} >
                    {" "}
                    <AddCircleOutline /> {buttonName}{" "}
                  </Button>
        </>
        
    )
}

