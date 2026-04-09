"use client";
import { Box, Chip, Typography } from "@mui/material";
import { useTab } from "./context/TabContext";
import { AddCircleOutline, Group } from "@mui/icons-material";
import { navigation } from "@/lib/routes";
import { GetUsers } from "../AuthValidator";
import { useState } from "react";
import TableMenu from "../component/TableManu";
import PageHeader from "../component/admin/PageHeader";
import DataTable, { Column } from "../component/admin/DataTable";

export default function Admin() {
  const [users, setusers] = useState<any[]>([]);
  GetUsers(setusers, "allusers");
  const { tabvalue } = useTab();
  const { go } = navigation();

  const handleAddUserBloger = () => {
    go("admin/addblogeruser");
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
            backgroundColor:
              row.role?.name === "admin"
                ? "rgba(102,126,234,0.12)"
                : row.role?.name === "bloger"
                ? "rgba(243,156,18,0.12)"
                : "rgba(46,204,113,0.12)",
            color:
              row.role?.name === "admin"
                ? "#667eea"
                : row.role?.name === "bloger"
                ? "#e67e22"
                : "#27ae60",
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
        title="Dashboard"
        subtitle="Manage all users and bloggers from one place"
        icon={<Group />}
        actionLabel="Add User / Blogger"
        onAction={handleAddUserBloger}
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
