"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import UserNavbar from "../component/user/UserNavbar";
import BlogGrid from "../component/user/BlogGrid";

export default function User() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#bfd3d6" }}>
      <UserNavbar onSearch={setSearchQuery} />
      <BlogGrid searchQuery={searchQuery} />
    </Box>
  );
}