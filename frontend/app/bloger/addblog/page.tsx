"use client";
import { blogCreate } from "@/app/AuthValidator";
import BlogForm from "@/app/component/BlogForm";
import { navigation } from "@/lib/routes";
import { Box, Container, Typography, Paper, Divider } from "@mui/material";
import { useState } from "react";
import Error from "@/app/component/Error";
import { LoginBox } from "../../admin/addblogeruser/page";

interface Form {
  title: string;
  slug: string;
  footer: string;
  image: File | null;
}

export default function AddBlog() {
  const [error, seterror] = useState<string[]>([]);
  const { go } = navigation();
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

  const handlesubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", String(form.title));
    formData.append("slug", String(form.slug));
    formData.append("footer", String(form.footer));
    formData.append("content", content);
    if (form.image) {
      formData.append("image", form.image);
    }
    blogCreate(formData, go, seterror);
  };

  return (
    <Box sx={{ ...LoginBox, minHeight: "calc(100vh - 100px)", borderRadius: "24px", my: 2 }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            px: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 6 },
            boxShadow: "0px 20px 60px rgba(79,110,247,0.08), 0px 4px 16px rgba(0,0,0,0.04)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                color: "#1A1D2E",
                letterSpacing: "-0.5px",
                mb: 1,
              }}
            >
              Create New Blog
            </Typography>
            <Typography variant="body2" sx={{ color: "#8A94A6" }}>
              Share your thoughts with the world. Fill in the details below.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: "#EEF0F6" }} />

          <Error error={error} />

          <BlogForm
            handleinput={handleinput}
            form={form}
            content={content}
            setcontent={setcontent}
            handlesubmit={handlesubmit}
          />

          <Divider sx={{ my: 4, borderColor: "#EEF0F6" }} />

          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#B0B8C8",
              fontSize: "0.75rem",
            }}
          >
            Your content is automatically saved as you type · © 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

