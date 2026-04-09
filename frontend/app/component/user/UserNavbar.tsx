"use client";
import { AppBar, Box, Toolbar, Typography, IconButton, InputBase } from "@mui/material";
import { Search, RssFeed } from "@mui/icons-material";
import { useState } from "react";
import LogoutButton from "../LogoutButton";

interface UserNavbarProps {
  onSearch?: (query: string) => void;
}

export default function UserNavbar({ onSearch }: UserNavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)",
        borderBottom: "2px solid rgba(191, 211, 214, 0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
        {/* Logo / Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #bfd3d6 0%, #8fb5bb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(191,211,214,0.4)",
            }}
          >
            <RssFeed sx={{ color: "#2c3e50", fontSize: 22 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #bfd3d6 0%, #e8f4f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BlogHub
          </Typography>
        </Box>

        {/* Search & Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: searchOpen ? "rgba(255,255,255,0.15)" : "transparent",
              borderRadius: "24px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              width: searchOpen ? 260 : 40,
              overflow: "hidden",
              border: searchOpen ? "1px solid rgba(191,211,214,0.3)" : "1px solid transparent",
            }}
          >
            <IconButton onClick={() => setSearchOpen(!searchOpen)} sx={{ color: "#bfd3d6" }}>
              <Search />
            </IconButton>
            {searchOpen && (
              <InputBase
                placeholder="Search blogs…"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                sx={{
                  color: "#e8f4f6",
                  fontSize: "0.9rem",
                  flex: 1,
                  pr: 2,
                  "& ::placeholder": { color: "rgba(191,211,214,0.6)" },
                }}
              />
            )}
          </Box>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
