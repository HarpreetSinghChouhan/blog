"use client";
import BlogContent from "@/app/component/BlogContent";
import { ArrowBack, Preview } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography, Divider } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ViewBlog() {
  const params = useParams();
  const id = params.id as string;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header / Nav */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Link href="/admin/blogs" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: "10px",
              borderColor: "rgba(102,126,234,0.3)",
              color: "#667eea",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(102,126,234,0.08)",
                borderColor: "#667eea",
              }
            }}
          >
            Back to Blogs
          </Button>
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#8e8ea0" }}>
          <Preview sx={{ fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
            Admin Preview
          </Typography>
        </Box>
      </Box>

      {/* Blog Content Paper */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: "20px", 
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
          overflow: "hidden"
        }}
      >
        <Typography variant="overline" sx={{ color: "#a0a0b0", fontWeight: 700, mb: 1, display: "block" }}>
          Blog ID: {id}
        </Typography>
        <Divider sx={{ mb: 4, borderColor: "rgba(0,0,0,0.04)" }} />
        
        <Box sx={{ 
          "& img": { maxWidth: "100%", borderRadius: "12px", my: 2 },
          "& p": { lineHeight: 1.8, color: "#3a3a4a" }
        }}>
          <BlogContent id={id} />
        </Box>
      </Paper>
    </Container>
  );
}