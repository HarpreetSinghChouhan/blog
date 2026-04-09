"use client";
import { Chip } from "@mui/material";

interface StatusChipProps {
  status: string;
}

const statusStyles: Record<string, { bg: string; color: string }> = {
  active: { bg: "rgba(46,204,113,0.12)", color: "#27ae60" },
  approved: { bg: "rgba(46,204,113,0.12)", color: "#27ae60" },
  published: { bg: "rgba(46,204,113,0.12)", color: "#27ae60" },
  pending: { bg: "rgba(243,156,18,0.12)", color: "#e67e22" },
  rejected: { bg: "rgba(231,76,60,0.12)", color: "#e74c3c" },
  inactive: { bg: "rgba(149,165,166,0.15)", color: "#7f8c8d" },
};

export default function StatusChip({ status }: StatusChipProps) {
  const normalised = status?.toLowerCase() || "pending";
  const style = statusStyles[normalised] || statusStyles.pending;

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.color,
        fontWeight: 700,
        fontSize: "0.75rem",
        height: 26,
        borderRadius: "8px",
        textTransform: "capitalize",
      }}
    />
  );
}
