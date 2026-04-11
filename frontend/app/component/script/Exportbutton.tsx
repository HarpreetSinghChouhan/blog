import { ImportExport } from "@mui/icons-material";
import { Button } from "@mui/material";
export const Style = {
 mx:1,
 bgcolor:"#a2ffee"
 }
export default function ExportButton(){
    return(
        <>
        <Button variant="outlined" sx={Style}  > <ImportExport /> Export  File</Button>
        </>
    )
}