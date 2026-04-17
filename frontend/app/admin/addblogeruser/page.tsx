"use client";
import {
  Box,
  Divider,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import Error from "@/app/component/Error";

import { navigation } from "@/lib/routes";
import { UserBlogerAdd } from "@/app/AuthValidator";
import SubmitButton from "@/app/component/SubmitButton";
import PasswordInput from "@/app/component/PasswordInput";
import UserInput, { UserEmailInput } from "@/app/component/inputfield/UserName";

interface FormType {
  name: string;
  email: string;
  password: string;
  role: string;
}
export const fieldStyles = {
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
export const LoginBox =
{
  minHeight: "100vh",
  background:
    "linear-gradient(145deg, #EEF2FF 0%, #F5F7FF 50%, #EDF4FF 100%)",
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
    background:
      "radial-gradient(circle, rgba(79,110,247,0.1) 0%, transparent 70%)",
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
    background:
      "radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)",
    bottom: "-80px",
    left: "-80px",
    pointerEvents: "none",
  },
}
export default function UserBloger() {
  const [error, seterror] = useState<string[]>([]);
  const { go } = navigation();
  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    UserBlogerAdd(form, go, seterror);
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>

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
              boxShadow:
                "0px 20px 60px rgba(79,110,247,0.10), 0px 4px 16px rgba(0,0,0,0.06)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>

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
                sx={{
                  color: "#8A94A6",
                  mt: 0.5,
                  fontFamily: "'Nunito', sans-serif",
                }}
              ></Typography>
            </Box>
            <Error error={error} />
            {/* Name Field */}

            <UserInput value={form.name} onChange={inputHandle} name={'name'} placeholder={'Enter Your Name'} label={'name'} />

            {/* Email Field */}

            <UserEmailInput value={form.email} onChange={inputHandle} name={'email'} placeholder={'Enter Your Email'} label={'email'} />
            {/* Password Field */}
            <PasswordInput value={form.password} onChange={inputHandle} name={'password'} placeholder={'Enter Password'} label={'password'} minlength={8} />
            <FormControl fullWidth sx={{ my: 1 }} >
              <InputLabel id="RoleId-no1">Role </InputLabel>
              <Select
                sx={{ ...fieldStyles }}
                labelId="RoleId-no1"
                size="small"
                name="role"
                onChange={(e: SelectChangeEvent) => {
                  inputHandle(e);
                }}
                value={form.role}
                label="Role"
              >
                <MenuItem value={"user"}>user</MenuItem>
                <MenuItem value={"bloger"}>bloger</MenuItem>
              </Select>
            </FormControl>
            {/* Submit Button */}
            <SubmitButton text={`add ${form.role}`} />
            {/* Divider */}
            <Divider sx={{ my: 3, borderColor: "#EEF0F6" }}>
              <Typography
                variant="caption"
                sx={{ color: "#B0B8C8", fontFamily: "'Nunito', sans-serif" }}
              >
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
      </Box></>
  );
}
