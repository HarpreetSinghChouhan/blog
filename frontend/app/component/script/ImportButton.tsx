import { Button } from "@mui/material";
import { Style } from "./Exportbutton";
import { ImportExport } from "@mui/icons-material";

export default function ImportButton() {
    return (
        <>
            <Button variant="outlined" sx={Style} > <ImportExport />  Import File </Button>
        </>
    )
}