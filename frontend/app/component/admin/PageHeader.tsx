"use client";
import { Box, Typography, Button, Chip } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { ReactNode } from "react";
import NumberChip, { BadgeChip } from "../Chips/chip";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  count?: number;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  icon,
  actionLabel,
  onAction,
  count,
}: PageHeaderProps) {
  return (
    <>
      {/* <Box> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left side — Title & subtitle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#1a1a2e",
                  letterSpacing: "-0.5px",
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                }}
              >
                {title}
              </Typography>
              {badge && (
                <BadgeChip badge={badge} />
              )}
              {typeof count === "number" && (
                <NumberChip count={count} />
              )}
            </Box>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: "#8e8ea0",
                  mt: 0.3,
                  fontSize: "0.85rem",
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right side — Action button */}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="contained"
            startIcon={<AddCircleOutline />}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              boxShadow: "0 4px 14px rgba(102,126,234,0.35)",
              "&:hover": {
                // background: "linear-gradient(135deg, #5a72d6 0%, #6a4294 100%)",
                boxShadow: "0 6px 20px rgba(102,126,234,0.5)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>

      {/* </Box> */}
    </>
  );
}
