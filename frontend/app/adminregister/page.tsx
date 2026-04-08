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
import { use, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Register1 from "../AuthValidator";
import { navigation } from "@/lib/routes";
import PasswordInput from "../component/PasswordInput";
import SubmitButton from "../component/SubmitButton";
import { fieldStyles } from "../admin/addblogeruser/page";
  
interface FormType {
  name: string;
  email: string;
  password: string;
}

export default function AdminRegister() {
  const [error,seterror] = useState<React.ReactNode[]>([])
  const {go} = navigation();
  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form);
     Register1(go,seterror,form);
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
              Admin Register
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#8A94A6", mt: 0.5, fontFamily: "'Nunito', sans-serif" }}
            >
              Sign up to access your dashboard
            </Typography>
          </Box>
        {error && (
          <Typography sx={{color:"red"}} >
             {
             error.map((err:any,i:any)=>( 
              <Typography key={i} component={'span'} >
                 {err}
              </Typography>

             ))
}
          </Typography>
        
        )}
          {/* Name Field */}
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            name="name"
            type="text"
            size="small"
            value={form.name}
            onChange={inputHandle}
            fullWidth
            required
            sx={{ ...fieldStyles, mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ fontSize: 18, color: "#A0AAB8" }} />
                </InputAdornment>
              ),
            }}
          />

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
        <PasswordInput value={form.password} onChange={inputHandle} name={'password'} placeholder={"Enter Secure Password"} label={'password'} minlength={8} />

        
          {/* Submit Button */}
          <SubmitButton text={'Sign Up'} />

          {/* Divider */}
          <Divider sx={{ my: 3, borderColor: "#EEF0F6" }}>
            <Typography variant="caption" sx={{ color: "#B0B8C8", fontFamily: "'Nunito', sans-serif" }}>
              Secure Admin Access <Link href={"/adminlogin"} >login</Link>
              
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