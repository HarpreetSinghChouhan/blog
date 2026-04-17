"use client"
import {
  Box,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Divider,
  Link,
} from "@mui/material";
import { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { navigation } from "@/lib/routes";
import {  Login2 } from "../AuthValidator";
import PasswordInput from "../component/PasswordInput";
import SubmitButton from "../component/SubmitButton";
import { fieldStyles, LoginBox } from "../admin/addblogeruser/page";
  
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

  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form);
     const data = {
        name:form.name,
        email:form.email,
        password:form.password,
     } 
     Login2(data,go,seterror);
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


   
  return (
    <Box
      sx={LoginBox}
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
            {/* <Box
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
            </Box> */}
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#1A1D2E",
                fontFamily: "'Nunito', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              Login Page
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#8A94A6", mt: 0.5, fontFamily: "'Nunito', sans-serif" }}
            >
              Sign in to access your dashboard
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
          <PasswordInput  value={form.password} onChange={inputHandle} name={'password'} placeholder={'Enter Your Password'}  label={'password'} minlength={8} />

          {/* Forgot Password */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              href="/forget-password"
              underline="hover"
              sx={{
                fontSize: "0.78rem",
                color: "#175ad8",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
              }}
            >
              Forgot Password?
            </Link>

 

          </Box>
          {/* Submit Button */}
         <SubmitButton text={'Sign Up'} />

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