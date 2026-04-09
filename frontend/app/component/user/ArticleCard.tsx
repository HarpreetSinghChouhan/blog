"use client";
import { Box, Typography, Chip, Button } from "@mui/material";
import { CalendarMonth, ArrowForward, Person } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ArticleCardProps {
  article: any;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const createdDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const stripHtml = (html: string) => {
    const tmp = typeof document !== "undefined" ? document.createElement("div") : null;
    if (tmp) {
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
    return html?.replace(/<[^>]*>/g, "") || "";
  };

  const contentPreview = article.content ? stripHtml(article.content).substring(0, 150) + "…" : "";

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
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
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
          height: 240,
          overflow: "hidden",
          backgroundColor: "#e8f0f2",
        }}
      >
        {article.image_url && !imgError ? (
          <Image
            src={article.image_url}
            alt={article.title || "Blog"}
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
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            opacity: 1,
            display: "flex",
            alignItems: "flex-end",
            p: 2,
          }}
        >
          {article.slug && (
            <Chip
              label={article.slug}
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "#2c3e50",
            lineHeight: 1.4,
            mb: 1.5,
            transition: "color 0.3s ease",
            ...(isHovered && { color: "#5a8a91" }),
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title || "Untitled Blog"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6c7a89",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            mb: 3,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {contentPreview}
        </Typography>

        {/* Footer Meta / Author */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
            borderTop: "1px solid #ecf0f1",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Person sx={{ fontSize: 16, color: "#fff" }} />
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#34495e" }}>
              {article.user?.name || "Author"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarMonth sx={{ fontSize: 16, color: "#95a5a6" }} />
            <Typography variant="caption" sx={{ color: "#95a5a6" }}>
              {createdDate}
            </Typography>
          </Box>
        </Box>

        <Button
          component={Link}
          href={`/articles/${article.slug || article.id}`}
          variant="contained"
          fullWidth
          endIcon={<ArrowForward />}
          sx={{
            background: isHovered 
              ? "linear-gradient(135deg, #6a9ea5 0%, #3d7a83 100%)"
              : "rgba(191,211,214,0.3)",
            color: isHovered ? "#fff" : "#3d7a83",
            boxShadow: isHovered ? "0 4px 12px rgba(61,122,131,0.3)" : "none",
            fontWeight: 700,
            textTransform: "none",
            py: 1,
            borderRadius: "10px",
            transition: "all 0.3s ease",
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}
