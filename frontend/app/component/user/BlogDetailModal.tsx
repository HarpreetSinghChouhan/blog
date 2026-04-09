"use client";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import { Close, CalendarMonth, Person, ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Blogfind } from "@/lib/api";

interface BlogDetailModalProps {
  open: boolean;
  onClose: () => void;
  blogId: string | null;
}

export default function BlogDetailModal({ open, onClose, blogId }: BlogDetailModalProps) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!blogId || !open) return;
    setLoading(true);
    setImgError(false);
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await Blogfind(blogId, token);
        setBlog(data.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId, open]);

  const createdDate = blog?.created_at
    ? new Date(blog.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#fafcfc",
          boxShadow: "0 40px 100px rgba(44,62,80,0.25)",
          maxHeight: "90vh",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(44,62,80,0.6)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: 40,
          height: 40,
          "&:hover": {
            backgroundColor: "#fff",
            transform: "rotate(90deg)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <Close sx={{ fontSize: 20, color: "#2c3e50" }} />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {loading ? (
          /* Loading Skeleton */
          <Box sx={{ p: 4 }}>
            <Skeleton
              variant="rectangular"
              height={350}
              sx={{ borderRadius: "16px", mb: 3 }}
            />
            <Skeleton variant="text" height={48} width="70%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="40%" sx={{ mb: 3 }} />
            <Skeleton variant="text" height={18} />
            <Skeleton variant="text" height={18} />
            <Skeleton variant="text" height={18} width="80%" />
          </Box>
        ) : blog ? (
          <Box
            sx={{
              animation: "modalFadeIn 0.4s ease",
              "@keyframes modalFadeIn": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* Hero Image */}
            {blog.image_url && !imgError ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 250, sm: 350, md: 420 },
                  overflow: "hidden",
                }}
              >
                <Image
                  src={blog.image_url}
                  alt={blog.title || "Blog"}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  onError={() => setImgError(true)}
                />
                {/* Gradient overlay at bottom */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(to top, rgba(250,252,252,1) 0%, rgba(250,252,252,0.6) 40%, transparent 100%)",
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  background:
                    "linear-gradient(135deg, #bfd3d6 0%, #8fb5bb 50%, #6a9ea5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontSize: 64, opacity: 0.4 }}>📝</Typography>
              </Box>
            )}

            {/* Content */}
            <Box sx={{ px: { xs: 3, sm: 5 }, pb: 5, mt: -4, position: "relative" }}>
              {/* Tags & Meta */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                {blog.slug && (
                  <Chip
                    label={blog.slug}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(191,211,214,0.4)",
                      color: "#3d7a83",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderRadius: "8px",
                      height: 28,
                    }}
                  />
                )}
                {createdDate && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CalendarMonth sx={{ fontSize: 16, color: "#95a5a6" }} />
                    <Typography
                      variant="caption"
                      sx={{ color: "#95a5a6", fontSize: "0.8rem" }}
                    >
                      {createdDate}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#2c3e50",
                  lineHeight: 1.3,
                  mb: 3,
                  fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
                  letterSpacing: "-0.5px",
                }}
              >
                {blog.title}
              </Typography>

              <Divider
                sx={{
                  mb: 3,
                  borderColor: "rgba(191,211,214,0.4)",
                  borderWidth: 1.5,
                  width: 60,
                  borderRadius: 2,
                }}
              />

              {/* Blog Content */}
              {blog.content && (
                <Box
                  sx={{
                    "& p": {
                      color: "#4a5568",
                      lineHeight: 1.85,
                      fontSize: "1.05rem",
                      mb: 2,
                    },
                    "& h1, & h2, & h3": {
                      color: "#2c3e50",
                      fontWeight: 700,
                      mt: 3,
                      mb: 1.5,
                    },
                    "& img": {
                      maxWidth: "100%",
                      borderRadius: "12px",
                      my: 2,
                    },
                    "& ul, & ol": {
                      color: "#4a5568",
                      lineHeight: 1.8,
                      pl: 3,
                    },
                    "& blockquote": {
                      borderLeft: "4px solid #bfd3d6",
                      pl: 2,
                      py: 1,
                      my: 2,
                      backgroundColor: "rgba(191,211,214,0.1)",
                      borderRadius: "0 8px 8px 0",
                    },
                    "& a": {
                      color: "#5a8a91",
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    },
                    "& code": {
                      backgroundColor: "rgba(191,211,214,0.2)",
                      borderRadius: "4px",
                      px: 0.8,
                      py: 0.2,
                      fontSize: "0.9em",
                      color: "#3d7a83",
                    },
                  }}
                >
                  <Typography
                    component="div"
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </Box>
              )}

              {/* Footer */}
              {blog.footer && (
                <Box
                  sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: "2px solid rgba(191,211,214,0.3)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#7f8c8d",
                      fontStyle: "italic",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    {blog.footer}
                  </Typography>
                </Box>
              )}

              {/* Back Button */}
              <Box
                onClick={onClose}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 4,
                  px: 3,
                  py: 1.2,
                  borderRadius: "12px",
                  backgroundColor: "rgba(191,211,214,0.25)",
                  color: "#3d7a83",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(191,211,214,0.5)",
                    transform: "translateX(-4px)",
                  },
                }}
              >
                <ArrowBack sx={{ fontSize: 18 }} />
                Back to Blogs
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#95a5a6" }}>
              Blog not found
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
