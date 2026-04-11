import FormUser from "@/app/component/admin/FormUser";
import { Box } from "@mui/material";

export default async function EditPage({params}:{params:{id : string | number}}){
     const {id} = await params;
      // console.log("Hello Every One",id);
    return(
        <>
        <Box>
          <FormUser id={id} />
        </Box>
        </>
    )
}