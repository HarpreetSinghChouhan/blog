"use client"
import { Logout } from "@/lib/api";
import  { navigation } from "@/lib/routes";
import { LogoutOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function LogoutButton() { 
     const {go} = navigation();
    const [loading, setLoading] = useState(false);
  const logout = async () => {
    const token = localStorage.getItem("token");
     if (!token) {
    console.log("No token found");
    return;
  }
    setLoading(true);
    try {
        const response = await Logout(token)
       ;
      if (response.status === true) {
        localStorage.removeItem("token"); // Clear token from local storage
            go("/adminlogin")
        // Logout successful, you can redirect the user or update the UI accordingly
        console.log(response.message);
      } else {
        alert("Logout failed");
      }
    } catch (error) {
        setLoading(false);
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          logout();
        }}
        disabled={loading}
      >
      <LogoutOutlined />{loading? "Logging out..." : "Logout"}
      </Button>
    </>
  );
}
