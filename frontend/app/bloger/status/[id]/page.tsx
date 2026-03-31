import AppBar1 from "@/app/component/AppBar";
import FormContainer from "@/app/component/blog/FormContainer";
import BlogForm from "@/app/component/BlogForm";
import { Box } from "@mui/material";

export default async function EditBlog({params}:{params:{id:string}}){
     const {id} = await params;

    //  console.log(id);
    return (
        <>
         <Box>
            <AppBar1 />
            <FormContainer id={id} />
          
         </Box>
        </>
    )
}