"use client";
import { Box, Container, Grid, Typography, Skeleton, Fade } from "@mui/material";
import { LibraryBooks } from "@mui/icons-material";
import { useState } from "react";
import { Blog } from "@/app/AuthValidator";
import BlogCard from "./BlogCard";
import BlogDetailModal from "./BlogDetailModal";

interface BlogGridProps {
  searchQuery: string;
}

export default function BlogGrid({ searchQuery }: BlogGridProps) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  Blog(setBlogs, "blogs");

  const filteredBlogs = blogs?.filter((blog: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(q) ||
      blog.slug?.toLowerCase().includes(q) ||
      blog.content?.toLowerCase().includes(q)
    );
  });

  const handleBlogClick = (blog: any) => {
    setSelectedBlogId(blog.id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBlogId(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#bfd3d6",
        backgroundImage:
          "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(143,181,187,0.2) 0%, transparent 50%)",
        pt: 5,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            animation: "slideDown 0.6s ease",
            "@keyframes slideDown": {
              "0%": { opacity: 0, transform: "translateY(-20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
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
              sx={{ color: "#3d7a83", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontSize: "0.75rem" }}
            >
              Latest Articles
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#2c3e50",
              mb: 1.5,
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
              letterSpacing: "-1px",
            }}
          >
            Explore Our Blogs
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#4a6670",
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            Discover insightful articles, stories, and knowledge shared by our community of writers.
          </Typography>
        </Box>

        {/* Blog Grid */}
        {filteredBlogs && filteredBlogs.length > 0 ? (
          <Grid container spacing={3.5}>
            {filteredBlogs.map((blog: any, index: number) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id || index}>
                <BlogCard blog={blog} onClick={handleBlogClick} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : blogs && blogs.length === 0 ? (
          /* Loading State */
          <Grid container spacing={3.5}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 20px rgba(44,62,80,0.08)",
                  }}
                >
                  <Skeleton variant="rectangular" height={220} animation="wave" />
                  <Box sx={{ p: 2.5 }}>
                    <Skeleton variant="text" height={28} width="80%" />
                    <Skeleton variant="text" height={16} sx={{ mt: 1 }} />
                    <Skeleton variant="text" height={16} width="60%" />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Empty / No Results State */
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              animation: "fadeIn 0.5s ease",
              "@keyframes fadeIn": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: 48 }}>📭</Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#2c3e50", fontWeight: 700, mb: 1 }}
            >
              {searchQuery ? "No matching blogs found" : "No Blogs Published Yet"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#7f8c8d" }}>
              {searchQuery
                ? "Try adjusting your search terms"
                : "Stay tuned for upcoming articles!"}
            </Typography>
          </Box>
        )}
      </Container>

      {/* Blog Detail Modal */}
      <BlogDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        blogId={selectedBlogId}
      />
    </Box>
  );
}
