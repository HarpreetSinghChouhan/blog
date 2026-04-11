import { Button } from "@mui/material";
import { Style } from "./Exportbutton";
import { ImportExport } from "@mui/icons-material";

export default function  SimpleButton(){
    return (
        <>
        <Button variant="outlined" sx={Style} > <ImportExport /> Simple Export </Button>
        </>
    )
}