"use client";
import { Blog } from "@/app/AuthValidator";
import TableMenuAdmin from "@/app/component/admin/TableMenu";
import StatusChip from "@/app/component/admin/StatusChip";
import PageHeader from "@/app/component/admin/PageHeader";
import DataTable, { Column } from "@/app/component/admin/DataTable";
import { Box, Typography } from "@mui/material";
import { Notes } from "@mui/icons-material";
import { useState } from "react";

export const stripHtml = (html: any) => {
  if (typeof window === "undefined") return html; // SSR safety
  const doc = new DOMParser().parseFromString(html, "text/html");
  let content = doc.body.textContent || "";
  return content.slice(0, 50) + "....";
};

export default function Blogs() {
  const [blogs, setblogs] = useState<any[]>([]);
  Blog(setblogs, "blogs");

  const columns: Column[] = [
    {
      id: "index",
      label: "#",
      minWidth: 50,
      render: (_row, index) => (
        <Typography sx={{ fontWeight: 600, color: "#b0b0c0", fontSize: "0.85rem" }}>
          {index + 1}
        </Typography>
      ),
    },
    {
      id: "title",
      label: "Title",
      minWidth: 150,
      render: (row) => (
        <Typography
          sx={{
            fontWeight: 700,
            color: "#1a1a2e",
            fontSize: "0.9rem",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.title}
        </Typography>
      ),
    },
    {
      id: "content",
      label: "Content",
      minWidth: 180,
      render: (row) => (
        <Typography
          sx={{
            color: "#8e8ea0",
            fontSize: "0.82rem",
            maxWidth: 220,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {stripHtml(row.content)}
        </Typography>
      ),
    },
    {
      id: "user_name",
      label: "Blogger",
      minWidth: 120,
      render: (row) => (
        <Box>
          <Typography sx={{ fontWeight: 600, color: "#1a1a2e", fontSize: "0.82rem", lineHeight: 1.2 }}>
            {row.user?.name}
          </Typography>
          <Typography sx={{ color: "#b0b0c0", fontSize: "0.72rem" }}>
            {row.user?.email}
          </Typography>
        </Box>
      ),
    },
    {
      id: "footer",
      label: "Footer",
      minWidth: 120,
      render: (row) => (
        <Typography
          sx={{
            color: "#8e8ea0",
            fontSize: "0.82rem",
            maxWidth: 140,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.footer || "—"}
        </Typography>
      ),
    },
    {
      id: "created_at",
      label: "Created",
      minWidth: 110,
      render: (row) => (
        <Typography sx={{ color: "#8e8ea0", fontSize: "0.8rem" }}>
          {new Date(row.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      align: "center",
      minWidth: 100,
      render: (row) => <StatusChip status={row.status} />,
    },
    {
      id: "action",
      label: "Action",
      align: "center",
      minWidth: 80,
      render: (row) => (
        <TableMenuAdmin
          blog={row}
          setblogs={setblogs}
          onStatusChange={(updatedBlog) => {
            setblogs((prev) =>
              prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            );
          }}
        />
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Blogs"
        subtitle="Review, publish, and manage all blog posts"
        icon={<Notes />}
        count={blogs?.length}
      />
      <DataTable
        columns={columns}
        rows={blogs || []}
        emptyMessage="No blogs found"
      />
    </Box>
  );
}
