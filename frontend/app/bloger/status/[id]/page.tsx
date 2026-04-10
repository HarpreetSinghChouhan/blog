"use client";
import FormContainer from "@/app/component/blog/FormContainer";
import { Box, Container, Typography, Paper, Divider } from "@mui/material";
import { LoginBox } from "../../../admin/addblogeruser/page";
import { use } from "react";

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

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
              Edit Blog Post
            </Typography>
            <Typography variant="body2" sx={{ color: "#8A94A6" }}>
              Update your content or settings. Changes are reflected immediately upon saving.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: "#EEF0F6" }} />

          <FormContainer id={id} />

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
            Editing post ID: {id} · © 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}