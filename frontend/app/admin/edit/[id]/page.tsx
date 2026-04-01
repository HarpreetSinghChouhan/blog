import FormUser from "@/app/component/admin/FormUser";
import { Box } from "@mui/material";

export default async function EditPage({params}:{params:{id : string}}){
     const {id} = await params;
    return(
        <>
        <Box>
          <FormUser id={id} />
        </Box>
        </>
    )
}