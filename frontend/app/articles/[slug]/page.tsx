"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Blogfind, BlogfindSlug } from "@/lib/api";
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  Skeleton,
  IconButton,
} from "@mui/material";
import { CalendarMonth, ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import UserNavbar from "@/app/component/user/UserNavbar";

export default function ArticleDetail() {
  const { slug } = useParams(); // Using slug (it will map to [slug] in folder)
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token") || "";
        // Currently Blogfind leverages ID in the backend, but since the frontend maps slug dynamically 
        // through routing, we pass it down. (The backend /blog/{id} needs to accept slug resolution)
        const data = await BlogfindSlug(slug as string, token);
        if (data && data.data) {
          setBlog(data.data);
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const createdDate = blog?.created_at
    ? new Date(blog.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafcfc" }}>
      <UserNavbar onSearch={(q) => router.push(`/articles?search=${q}`)} />

      <Container maxWidth="md" sx={{ pt: 4, pb: 10 }}>
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <IconButton
            onClick={() => router.push("/articles")}
            sx={{
              backgroundColor: "rgba(191,211,214,0.3)",
              color: "#3d7a83",
              "&:hover": { backgroundColor: "rgba(191,211,214,0.6)" },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>

        {loading ? (
          /* Loading Skeleton */
          <Box>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "24px", mb: 4 }} />
            <Skeleton variant="text" height={60} width="80%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={24} width="40%" sx={{ mb: 6 }} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} width="80%" />
          </Box>
        ) : blog ? (
          <Box
            sx={{
              animation: "fadeInUp 0.6s ease",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* Hero Image */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 280, sm: 400, md: 500 },
                borderRadius: "24px",
                overflow: "hidden",
                mb: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              {blog.image_url && !imgError ? (
                <Image
                  src={blog.image_url}
                  alt={blog.title || "Blog"}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #bfd3d6 0%, #8fb5bb 50%, #6a9ea5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 64, opacity: 0.4 }}>📝</Typography>
                </Box>
              )}
            </Box>

            {/* Article Header */}
            <Box sx={{ mb: 5, textAlign: "center" }}>
              {blog.slug && (
                <Chip
                  label={blog.slug}
                  sx={{
                    backgroundColor: "rgba(191,211,214,0.4)",
                    color: "#3d7a83",
                    fontWeight: 700,
                    mb: 3,
                  }}
                />
              )}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                  color: "#1a1a2e",
                  lineHeight: 1.2,
                  letterSpacing: "-1px",
                  mb: 3,
                }}
              >
                {blog.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Typography sx={{ fontWeight: 600, color: "#2c3e50" }}>
                  By {blog.user?.name || "Author"}
                </Typography>
                <Typography sx={{ color: "#bdc3c7" }}>•</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#7f8c8d" }}>
                  <CalendarMonth sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{createdDate}</Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 5, borderColor: "rgba(0,0,0,0.06)" }} />

            {/* Article Content */}
            <Box
              sx={{
                typography: "body1",
                "& p": { color: "#4a5568", lineHeight: 1.9, fontSize: "1.1rem", mb: 3 },
                "& h1, & h2, & h3": { color: "#1a1a2e", fontWeight: 800, mt: 5, mb: 3 },
                "& blockquote": {
                  borderLeft: "4px solid #bfd3d6",
                  pl: 3,
                  py: 1,
                  my: 4,
                  backgroundColor: "rgba(191,211,214,0.1)",
                  fontStyle: "italic",
                  fontSize: "1.2rem",
                  color: "#2c3e50",
                },
                "& img": { maxWidth: "100%", borderRadius: "16px", my: 4 },
                "& ul, & ol": { color: "#4a5568", lineHeight: 1.9, mb: 3, pl: 3 },
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
            </Box>

            {/* Footer Note */}
            {blog.footer && (
              <Box sx={{ mt: 8, p: 4, backgroundColor: "rgba(191,211,214,0.15)", borderRadius: "16px" }}>
                <Typography sx={{ fontStyle: "italic", color: "#5a8a91", textAlign: "center" }}>
                  {blog.footer}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h4" sx={{ color: "#2c3e50", mb: 2 }}>
              Article Not Found
            </Typography>
            <Typography sx={{ color: "#7f8c8d" }}>
              The article you're looking for doesn't exist or has been removed.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
