"use client";
import { Box, Container, Paper, Typography, Divider } from "@mui/material";
import { Create } from "@mui/icons-material";
import { LoginBox } from "../../admin/addblogeruser/page";

export default function EditBlog() {
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
            textAlign: "center"
          }}
        >
          <Create sx={{ fontSize: 48, color: "#667eea", mb: 2 }} />
          <Typography variant="h4" fontWeight={800} sx={{ color: "#1A1D2E", mb: 1 }}>
            Edit Blog
          </Typography>
          <Typography variant="body2" sx={{ color: "#8A94A6", mb: 4 }}>
            Please select a blog from the dashboard to edit its content.
          </Typography>
          <Divider sx={{ borderColor: "#EEF0F6" }} />
        </Paper>
      </Container>
    </Box>
  );
}