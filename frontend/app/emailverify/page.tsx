
"use client"
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {  VerifyEmail, VerifyOtp } from "../AuthValidator";
import { AuthChecker } from "../component/script/Authvalidation";
import EmailVerification from "../component/admin/EmailVerify";

export interface Form {
  email: string,
  otp: string,
}

export default function EmailVerify() {
  const [loading, setloading] = useState<boolean>(false);
  const [status, setstatus] = useState<boolean>(false);
  const [otp, setotp] = useState('');
  const [error, seterror] = useState<string[]>([]);
  const [runAuthCheck, setRunAuthCheck] = useState<boolean>(false);
  const [form, setform] = useState<Form>({ email: "", otp: "" });

  const handleChange = (newValue: any) => setotp(newValue);

  const handleinput = (e: any) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);

    if (status === false) {
      try {
        const formdata = new FormData();
        formdata.append('email', String(form.email));
        await VerifyEmail({ formdata, setstatus, seterror });
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    } else {
      try {
        const formdata = new FormData();
        formdata.append('email', String(form.email));
        formdata.append("otp", otp);
        const response = await VerifyOtp({ formdata, seterror });

        if (response?.status === true) {
          localStorage.setItem("token", response.token);
          setRunAuthCheck(true); 
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <>
     
      {runAuthCheck && <AuthChecker />}

      <Container maxWidth={'lg'} sx={{ minHeight: "100vh", alignContent: "center" }}>
        <Box sx={{ maxWidth: "900px", mx: "auto", boxShadow: "0px 0px 10px black", p: 4, borderRadius: "15px" }}>
        
          <EmailVerification handleSubmit={handleSubmit} error={error} handleinput={handleinput} handleChange={handleChange} form={form} otp={otp}  loading={loading} status={status}   />
        </Box>
      </Container>
    </>
  );
}

