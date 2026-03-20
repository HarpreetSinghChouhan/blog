"use client"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { navigation } from "@/lib/routes";
import { Login1 } from "../AuthValidator";
import { Span } from "next/dist/trace";
  
interface FormType {
  name: string;
  email: string;
  password: string;
}

export default function AdminLogin() {
     const { go } = navigation();
  const [error, seterror] = useState<React.ReactNode[]>([]);
  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form);
     const data = {
        name:form.name,
        email:form.email,
        password:form.password,
     } 
     Login1(data,go,seterror);
    
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#F8F9FC",
      fontSize: "0.9rem",
      "&:hover fieldset": {
        borderColor: "#4F6EF7",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4F6EF7",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#4F6EF7",
    },
  };
   
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #EEF2FF 0%, #F5F7FF 50%, #EDF4FF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,110,247,0.1) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)",
          bottom: "-80px",
          left: "-80px",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={submitHandle}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
            boxShadow: "0px 20px 60px rgba(79,110,247,0.10), 0px 4px 16px rgba(0,0,0,0.06)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "16px",
                background: "linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
                boxShadow: "0 8px 24px rgba(79,110,247,0.30)",
              }}
            >
              <AdminPanelSettingsOutlinedIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#1A1D2E",
                fontFamily: "'Nunito', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              Admin Portal
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#8A94A6", mt: 0.5, fontFamily: "'Nunito', sans-serif" }}
            >
              Sign up to access your dashboard
            </Typography>
            {error &&(
                <Typography sx={{color:"red"}} >
                  {error.map((err:any,i)=>(
                    <Typography key={i} component={'span'} >
                        {err}
                        </Typography>
                  ))}
                </Typography>
            )}
          </Box>
          {/* Email Field */}
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            name="email"
            size="small"
            value={form.email}
            onChange={inputHandle}
            fullWidth
            required
            sx={{ ...fieldStyles, mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: "#A0AAB8" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            placeholder="Enter your password"
            name="password"
            type={showPassword ? "text" : "password"}
            size="small"
            value={form.password}
            onChange={inputHandle}
            fullWidth
            required
            sx={{ ...fieldStyles, mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 18, color: "#A0AAB8" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: "#A0AAB8" }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "0.78rem",
                color: "#4F6EF7",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)",
              borderRadius: "10px",
              py: 1.2,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              letterSpacing: "0.2px",
              boxShadow: "0 6px 20px rgba(79,110,247,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #3D5CE8 0%, #5A7AFF 100%)",
                boxShadow: "0 8px 28px rgba(79,110,247,0.45)",
              },
            }}
          >
            Sign In
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 3, borderColor: "#EEF0F6" }}>
            <Typography variant="caption" sx={{ color: "#B0B8C8", fontFamily: "'Nunito', sans-serif" }}>
              Secure Admin Access
            </Typography>
          </Divider>

          {/* Footer note */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#B0B8C8",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.75rem",
            }}
          >
            Protected by enterprise-grade security · © 2025
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}