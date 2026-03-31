"use client"  
import { Container, Grid, Typography } from "@mui/material";
import BlogContent from "../BlogContent";
import { useState } from "react";
import { Blog } from "@/app/AuthValidator";

export default function BlogContainer() {
    const [blogs,setblogs] = useState<any[]>([]);
     Blog(setblogs,'blogs');
     console.log(blogs);
    return (
        <>
            <Container maxWidth={"lg"} >
                <Grid container spacing={2} >
                    {blogs && blogs.length>0 ? blogs.map((bl:any,i:number)=>( 
                      <Grid size={6} key={i} >
                    <BlogContent id={bl.id} />
                </Grid>
                   ) ):(
                    <Typography>
                        Cannot Any Blog Published
                    </Typography>
                   )}
                {/* <Grid size={6} >
                    <BlogContent id={'15'} />
                </Grid>
                <Grid size={6} >
                    <BlogContent id={'16'} />
                </Grid> */}
            </Grid>
            </Container>
        </>
    )
}