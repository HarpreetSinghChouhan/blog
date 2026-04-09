"use client";
import { Box, Container, Grid, Typography, Skeleton } from "@mui/material";
import { LibraryBooks } from "@mui/icons-material";
import { useState } from "react";
import { Blog } from "@/app/AuthValidator";
import ArticleCard from "../component/user/ArticleCard";
import UserNavbar from "../component/user/UserNavbar";

export default function ArticlesPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs
  Blog(setBlogs, "blogs");

  // Filter only 'published' blogs and apply search query
  const publishedBlogs = blogs?.filter((blog: any) => {
    // Only published
    if (blog.status !== "published") return false;

    // Search query match
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(q) ||
      blog.slug?.toLowerCase().includes(q) ||
      blog.content?.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#bfd3d6" }}>
      <UserNavbar onSearch={setSearchQuery} />

      <Box
        sx={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(143,181,187,0.2) 0%, transparent 50%)",
          pt: 8,
          pb: 10,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              animation: "slideDown 0.6s ease",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2.5,
                py: 0.8,
                borderRadius: "30px",
                backgroundColor: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.6)",
                mb: 2,
              }}
            >
              <LibraryBooks sx={{ fontSize: 18, color: "#3d7a83" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "#3d7a83",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
              >
                Published Articles
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "#2c3e50",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                letterSpacing: "-1.5px",
              }}
            >
              Discover Great Reads
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4a6670",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              Read the latest stories and insights published by our amazing community of writers and creators.
            </Typography>
          </Box>

          {/* Grid Layout */}
          {publishedBlogs && publishedBlogs.length > 0 ? (
            <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
              {publishedBlogs.map((article: any, index: number) => (
                <Grid size={{xs:12,sm:6,md:4}} key={article.id || index}>
                  <ArticleCard article={article} index={index} />
                </Grid>
              ))}
            </Grid>
          ) : blogs && blogs.length === 0 ? (
            /* Loading State */
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid size={{xs:12,sm:6,md:4}} key={i}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 20px rgba(44,62,80,0.08)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton variant="rectangular" height={240} animation="wave" />
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Skeleton variant="text" height={32} width="80%" />
                      <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />
                      <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 2 }} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            /* Empty State */
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Typography sx={{ fontSize: 56 }}>📭</Typography>
              </Box>
              <Typography variant="h5" sx={{ color: "#2c3e50", fontWeight: 700, mb: 1 }}>
                {searchQuery ? "No matches found" : "No Published Articles"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#4a6670" }}>
                {searchQuery
                  ? "Try looking up a different term."
                  : "We're currently waiting for writers to publish their stories."}
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}