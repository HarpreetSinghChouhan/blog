import { Button } from "@mui/material";
import { Style } from "./Exportbutton";
import { SimpleData } from "@/lib/excel/api";
import { ImportExport } from "@mui/icons-material";

export default function SimpleButton() {
    const handleimport = async (e: any) => {
        // console.log(e);
        const token = localStorage.getItem("token");
        const response = await SimpleData(token);
        console.log(response);
    }
    return (

        <>
            <Button variant="outlined" sx={Style} onClick={(e:any)=>{handleimport(e)}} > <ImportExport /> Simple Export </Button>
        </>
    )
}
