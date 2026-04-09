"use client";
import { GetUsers } from "@/app/AuthValidator";
import TableMenu from "@/app/component/TableManu";
import PageHeader from "@/app/component/admin/PageHeader";
import DataTable, { Column } from "@/app/component/admin/DataTable";
import { Box, Chip, Typography } from "@mui/material";
import { ContactPage } from "@mui/icons-material";
import { useState } from "react";

export default function Bloger() {
  const [bloger, setbloger] = useState<any[]>([]);
  GetUsers(setbloger, "bloger");

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
      id: "name",
      label: "Name",
      minWidth: 140,
      render: (row) => (
        <Typography sx={{ fontWeight: 600, color: "#1a1a2e", fontSize: "0.9rem" }}>
          {row.name}
        </Typography>
      ),
    },
    {
      id: "email",
      label: "Email",
      minWidth: 200,
      render: (row) => (
        <Typography sx={{ color: "#5a5a6e", fontSize: "0.88rem" }}>{row.email}</Typography>
      ),
    },
    {
      id: "role",
      label: "Role",
      minWidth: 100,
      render: (row) => (
        <Chip
          label={row.role?.name}
          size="small"
          sx={{
            backgroundColor: "rgba(243,156,18,0.12)",
            color: "#e67e22",
            fontWeight: 700,
            fontSize: "0.75rem",
            height: 26,
            borderRadius: "8px",
            textTransform: "capitalize",
          }}
        />
      ),
    },
    {
      id: "created_at",
      label: "Created At",
      minWidth: 160,
      render: (row) => (
        <Typography sx={{ color: "#8e8ea0", fontSize: "0.82rem" }}>
          {new Date(row.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      ),
    },
    {
      id: "action",
      label: "Action",
      align: "center",
      minWidth: 80,
      render: (row) => <TableMenu user={row} setusers={setbloger} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Bloggers"
        subtitle="Manage registered bloggers"
        icon={<ContactPage />}
        count={bloger?.length}
      />
      <DataTable
        columns={columns}
        rows={bloger || []}
        emptyMessage="No bloggers found"
      />
    </Box>
  );
}