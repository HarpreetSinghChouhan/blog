"use client";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { use, useState } from "react";
import { navigation } from "@/lib/routes";
import { UserBlogerEdit } from "@/app/AuthValidator";
import Error from "../Error";
import PasswordInput from "../PasswordInput";
import SubmitButton from "../SubmitButton";
import { LoginBox } from "@/app/admin/addblogeruser/page";
import UserInput, { UserEmailInput } from "../inputfield/UserName";

interface FormType {
  name: string;
  email: string;
  role?: string;
}

export default function EditUserBloger({ id, form, setform }: any) {
  const [error, seterror] = useState<string[]>([]);
  const { go } = navigation();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", String(form.name));
    formdata.append("email", String(form.email));
    formdata.append("role", String(form.role));
    // formdata.append("_method","PUT");

    UserBlogerEdit({ formdata, go, seterror, id });
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform({
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
                User Edit
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
            {/* Name Component */}
                 <UserInput value={form.name} onChange={inputHandle} name={'name'} placeholder={'Enter Your Name'} label={'email'}  />
            {/* Email Field */}
            <UserEmailInput value={form.email} onChange={inputHandle} name={'email'} placeholder={'Enter Your Email'} label={'email'} />
            {/* Password Field */}
            <PasswordInput value={form.password} onChange={inputHandle} name={'password'} placeholder={"Enter password"} label={'password'} minlength={8} />
            <FormControl fullWidth sx={{ my: 1 }} >
              <InputLabel id="RoleId-no1">Role </InputLabel>
              <Select sx={{}} labelId="RoleId-no1" size="small" name="role" onChange={(e: any) => { inputHandle(e) }} value={form.role} label={"Role"}>
                <MenuItem value={"user"}>user</MenuItem>
                <MenuItem value={"bloger"}>bloger</MenuItem>
              </Select>
            </FormControl>
            {/* Submit Button */}
            <SubmitButton text={`save ${form.role}`} />
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
