"use client";
import { Blog } from "@/app/AuthValidator";
import { Box, Typography } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import PageHeader from "../../component/admin/PageHeader";
import DataTable, { Column } from "../../component/admin/DataTable";
import { History } from "@mui/icons-material";
import StatusChip from "../../component/admin/StatusChip";
import TableMenuBloger from "../../component/bloger/TableMenuBloger";
import { navigation } from "@/lib/routes";

export const stripHtml = (html: any) => {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  let content = doc.body.textContent || "";
  return content.length > 50 ? content.slice(0, 50) + "..." : content;
};

export default function Status() {
  const [blogs, setblogs] = useState<any[]>([]);
  const { go } = navigation();
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
      minWidth: 160,
      render: (row: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <Typography sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "0.9rem" }}>
          {row.title}
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
      id: "created_at",
      label: "Created",
      minWidth: 120,
      render: (row) => (
        <Typography sx={{ color: "#8e8ea0", fontSize: "0.8rem" }}>
          {new Date(row.created_at).toLocaleDateString()}
        </Typography>
      ),
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
        title="Blog Status"
        subtitle="Track the status and history of your published articles"
        icon={<History />}
        count={blogs?.length}
      />
      <DataTable
        columns={columns}
        rows={blogs || []}
        emptyMessage="No blog history found."
      />
    </Box>
  );
}
