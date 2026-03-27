// "use client"
import BlogContent from "@/app/component/BlogContent";
import { Box, Container } from "@mui/material";
import { log } from "console";
// import { usePathname } from "next/navigation";

export default async function ViewBlog({params}:{params:{id:string}}){
    // const pathname = usePathname()
    const {id} = await params; 
    console.log(id);
    return(
        <>
        <Container maxWidth="xl" sx={{border:"1px solid black",p:3}} > 
            <BlogContent /> 
        </Container>
        </>
    )
}