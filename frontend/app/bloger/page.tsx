"use client";
import { Box, Typography } from "@mui/material";
import { LibraryBooks } from "@mui/icons-material";
import { useState } from "react";
import { Blog } from "../AuthValidator";
import { navigation } from "@/lib/routes";
import { stripHtml } from "../admin/blogs/page";
import PageHeader from "../component/admin/PageHeader";
import DataTable, { Column } from "../component/admin/DataTable";
import StatusChip from "../component/admin/StatusChip";
import TableMenuBloger from "../component/bloger/TableMenuBloger";

export default function Blogs() {
  const [blogs, setblogs] = useState<any[]>([]);
  Blog(setblogs, "blogs");
  const { go } = navigation();

  const handleAddBlog = () => {
    go("bloger/addblog");
  };

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
      render: (row) => <TableMenuBloger blog={row} setblogs={setblogs} go={go} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="My Blogs"
        subtitle="Manage and track your published articles"
        icon={<LibraryBooks />}
        actionLabel="Add Blog"
        onAction={handleAddBlog}
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

