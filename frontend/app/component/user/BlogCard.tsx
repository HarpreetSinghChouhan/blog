"use client";
import { Box, Typography, Chip } from "@mui/material";
import { CalendarMonth, ArrowForward } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

interface BlogCardProps {
  blog: any;
  onClick: (blog: any) => void;
  index: number;
}

export default function BlogCard({ blog, onClick, index }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const createdDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Strip HTML from content for preview
  const stripHtml = (html: string) => {
    const tmp = typeof document !== "undefined" ? document.createElement("div") : null;
    if (tmp) {
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
    return html?.replace(/<[^>]*>/g, "") || "";
  };

  const contentPreview = blog.content ? stripHtml(blog.content).substring(0, 120) + "…" : "";

  return (
    <Box
      onClick={() => onClick(blog)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: "pointer",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: isHovered
          ? "0 20px 60px rgba(44,62,80,0.18), 0 8px 24px rgba(191,211,214,0.3)"
          : "0 4px 20px rgba(44,62,80,0.08)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #bfd3d6, #8fb5bb, #6a9ea5)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          overflow: "hidden",
          backgroundColor: "#e8f0f2",
        }}
      >
        {blog.image_url && !imgError ? (
          <Image
            src={blog.image_url}
            alt={blog.title || "Blog"}
            fill
            unoptimized
            style={{
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            }}
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
            <Typography sx={{ fontSize: 48, opacity: 0.4 }}>📝</Typography>
          </Box>
        )}

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2.5, pb: 3 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#2c3e50",
            lineHeight: 1.4,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            transition: "color 0.3s ease",
            ...(isHovered && { color: "#5a8a91" }),
          }}
        >
          {blog.title || "Untitled Blog"}
        </Typography>

        {/* Content Preview */}
        {contentPreview && (
          <Typography
            variant="body2"
            sx={{
              color: "#7f8c8d",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {contentPreview}
          </Typography>
        )}

        {/* Footer / Meta */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 1.5,
            borderTop: "1px solid #ecf0f1",
          }}
        >
          {createdDate && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarMonth sx={{ fontSize: 16, color: "#95a5a6" }} />
              <Typography variant="caption" sx={{ color: "#95a5a6", fontSize: "0.78rem" }}>
                {createdDate}
              </Typography>
            </Box>
          )}
          {blog.slug && (
            <Chip
              label={blog.slug}
              size="small"
              sx={{
                backgroundColor: "rgba(191,211,214,0.3)",
                color: "#5a8a91",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: isHovered ? "#5a8a91" : "#bdc3c7",
              transition: "all 0.3s ease",
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.78rem" }}>
              Read
            </Typography>
            <ArrowForward sx={{ fontSize: 14 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
