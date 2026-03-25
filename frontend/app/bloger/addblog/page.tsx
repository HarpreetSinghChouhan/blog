"use client";
import { blogCreate } from "@/app/AuthValidator";
import AppBar1 from "@/app/component/AppBar";
import BlogForm from "@/app/component/BlogForm";
import TipTapEditor from "@/app/component/tiptapeditor";
import { navigation } from "@/lib/routes";
import {
  Box,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
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
     if (e.target.type === "file") {
    const file = e.target.files?.[0] || null;
    setform((prev: any) => ({ ...prev, image: file }));  
  } else {
    setform((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }
// };
  // const { name, value, type, files } = e.target;
  // setform({
  //   ...form,
  //   [name]: type === "file" ? files[0] : value,
  // });
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
      <Box sx={{ minHeight: "100vh", bgcolor: "#eef0f2" }}>
        <AppBar1 />
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
                <Typography>
                  {error.map((value: any,i)=>(
                    <Typography key={i}>
                       {error}                    
                      </Typography>
                  ) )}
                </Typography>
              )

              }
             <BlogForm handleinput={(e:any)=>handleinput(e)} form={form} content={content} setcontent={setcontent} handlesubmit={(e:any)=>handlesubmit(e) } />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
