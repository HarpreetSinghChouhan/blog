"use client";
import PageHeader from "../../component/admin/PageHeader";
import { Box } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { navigation } from "@/lib/routes";

export default function Blog() {
  const { go } = navigation();

  return (
    <Box>
      <PageHeader
        title="Welcome to Blogger Portal"
        subtitle="Your hub for creating and managing high-quality content"
        icon={<Dashboard />}
        actionLabel="Go to Dashboard"
        onAction={() => go("/bloger")}  
      />
    </Box>
  );
}
