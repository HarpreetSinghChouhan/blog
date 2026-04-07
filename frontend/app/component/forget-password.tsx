"use client";
import { Box, Button, Container } from "@mui/material";
import { AuthChecker, PasswordForget } from "./script/Authvalidation";
import EmailVerification from "./admin/EmailVerify";
import { useState } from "react";
import { ChangePassword1, VerifyEmail, VerifyOtp } from "../AuthValidator";
import { Form } from "../emailverify/page";
import PasswordInput from "./PasswordInput";
import Error from "./Error";

 export interface NewPassword{
    oldpassword:String | null,
    newpassword:String | null,
    confirmpassword:String | null,
 }
export default function ForgetPassword() {
    const [loading, setloading] = useState<boolean>(false);
    const [status, setstatus] = useState<boolean>(false);
    const [error, seterror] = useState<string[]>([]);
    const [form, setform] = useState<NewPassword>({ oldpassword: "", newpassword: "", confirmpassword: "" });
    const [user, setuser] = useState<any>(null);
    const [otp, setotp] = useState("");
    const handleinput = (e: any) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    const [runAuthCheck, setRunAuthCheck] = useState<boolean>(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setloading(true);

            try {
                const formdata = new FormData();
                formdata.append("oldpassword", String(form.oldpassword));
                formdata.append("newpassword", String(form.newpassword));
                formdata.append("confirmpassword", String(form.confirmpassword));
                await ChangePassword1({form,seterror});
                       
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false);
            }
        
    };
    return (
        <>
            <Container maxWidth={"lg"}>
                <Container
                    maxWidth={"lg"}
                    sx={{ minHeight: "100vh", alignContent: "center" }}
                >
                    <Box
                    component={'form'}
                    onSubmit={handleSubmit}
                        sx={{
                            maxWidth: "900px",
                            mx: "auto",
                            boxShadow: "0px 0px 10px black",
                            p: 4,
                            borderRadius: "15px",
                        }}
                    >
                        <Error error={error} />
                        <PasswordInput value={form.oldpassword} onChange={handleinput} name="oldpassword" placeholder="Enter your Old password" label="Old Password" minlength={null} />
                        <PasswordInput value={form.newpassword} onChange={handleinput} name="newpassword" placeholder="Enter your New password" label="New Password" minlength={null} />
                        <PasswordInput value={form.confirmpassword} onChange={handleinput} name="confirmpassword" placeholder="Enter your Confirm password" label="Confirm Password" minlength={null} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#2a7edfff",
                                borderRadius: "10px",
                                padding: "12px",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                textTransform: "none",
                                boxShadow: "0px 4px 12px rgba(33, 169, 248, 0.3)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#2d87ecff",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0px 6px 16px rgba(33, 145, 236, 0.4)",
                                },
                            }}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Submit"}
                        </Button>
                    </Box>
                </Container>
            </Container>
        </>
    );
}
