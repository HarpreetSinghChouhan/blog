import { ExportData } from "@/lib/api";
import { ImportExport } from "@mui/icons-material";
import { Button } from "@mui/material";
export const Style = {
 mx:1,
 bgcolor:"#a2ffee"
 }
export default function ExportButton(){
    const handleExport = async(e:any) =>{
        // console.log(e);
        const token = localStorage.getItem("token");
        const response = await ExportData(token);
         console.log(response);
    }
    return(
        <>
        <Button variant="outlined" sx={Style} onClick={(e:any)=>handleExport(e)}  > <ImportExport /> Export  File</Button>
        </>
    )
}