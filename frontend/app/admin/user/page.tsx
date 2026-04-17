"use client";
import { GetUsers } from "@/app/AuthValidator";
import TableMenu from "@/app/component/TableManu";
import PageHeader from "@/app/component/admin/PageHeader";
import DataTable, { Column } from "@/app/component/admin/DataTable";
import { Box, Chip, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState } from "react";

export default function Users() {
  const [users, setusers] = useState<[]>([]);
  GetUsers(setusers, "users");

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
            backgroundColor: "rgba(46,204,113,0.12)",
            color: "#27ae60",
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
      render: (row) => <TableMenu user={row} setusers={setusers} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Users"
        subtitle="Manage registered users"
        icon={<Person />}
        count={users?.length}
      />
      <DataTable
        columns={columns}
        rows={users || []}
        emptyMessage="No users found"
      />
    </Box>
  );
}
