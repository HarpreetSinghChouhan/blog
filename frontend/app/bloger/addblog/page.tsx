"use client";
import { blogCreate } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import BlogForm from "@/app/component/BlogForm";
import { navigation } from "@/lib/routes";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
interface Form {
  title: String;
  slug: String;
  footer: String;
  image: File | null;
}
export default function AddBlog() {
  const [error,seterror] = useState<React.ReactNode[]>([]);
  const {go} = navigation();
  const [form, setform] = useState<Form>({
    title: "",
    slug: "",
    footer: "",
    image: null,
  });
  const [content, setcontent] = useState("");
   const handleinput = (e: any) => {
  const { name, value, type, files } = e.target;
  setform({
    ...form,
    [name]: type === "file" ? files[0] : value,
  });
  };
  const handlesubmit = (e:any) =>{
     e.preventDefault();
      const formData = new FormData();
  formData.append("title",String(form.title));
  formData.append("slug", String(form.slug));
  formData.append("footer", String(form.footer));
  formData.append("content", content);
  if (form.image) {
    formData.append("image", form.image); 
  }
  blogCreate(formData, go, seterror);

  }
  return (
    <>
        <Typography
          component={"div"}
          sx={{ my: 3, textAlign: "center" }}
          variant="h5"
        >
           Blog Add
          </Typography>
        {/* border: "2px solid black" */}
        <Container
          maxWidth="lg"
          sx={{ boxShadow: "0px 0px 10px black", py: 3, backgroundColor: "" }}
        >
          <Grid container spacing={2}>
            <Grid size={{ md: 10, xs: 12 }} sx={{ mx: "auto" }}>
              {error && (
                <Typography color="red" >
                  {error.map((err: any,i)=>(
                    <Typography key={i}>
                       {err}                    
                      </Typography>
                  ) )}
                </Typography>
              )}
             <BlogForm handleinput={(e:any)=>handleinput(e)} form={form} content={content} setcontent={setcontent} handlesubmit={(e:any)=>handlesubmit(e) } />
            </Grid>
          </Grid>
        </Container>
    </>
  );
}
