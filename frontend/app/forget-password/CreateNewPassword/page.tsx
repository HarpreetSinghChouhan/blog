"use client";
import { VisibilityOff, Visibility, ArrowRightAltOutlined, ArrowBackIosNewOutlined, ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material"
import PasswordInput from "@/app/component/PasswordInput";
import { AuthCheker, ChangePassword, verifyPasswordToken } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/app/component/Error";
import { ChangePassword1 } from "@/app/AuthValidator";
import { AuthChecker } from "@/app/component/script/Authvalidation";

interface Form{
    password:String | null, 
    confirmpassword:String | null;
}
export default function CreatePassword() {
    const router = useRouter();
    const [user, setUser] = useState<any>();
    const [error, seterror] = useState<string[]>([]);
    const [load, setload] = useState<boolean>(true);
  const [runAuthCheck, setRunAuthCheck] = useState<boolean>(false);
    const [form, setform] = useState<Form>({
        password: "",
        confirmpassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        try {

            const Get = async () => {
                let token = localStorage.getItem("token1");
                let token1 = localStorage.getItem("token");
                let email = localStorage.getItem("email");
                // console.log(email);
                // console.log(token);
                const res = await verifyPasswordToken(email,token,token1);
                if (res.message == "Unauthorized") {
                    router.push("/login");
                }
            }
            Get();
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setload(false);
        }
    }, []);
    if (load == true) {
        return (
            <>
                <Container>
                    Loading ...
                </Container>
            </>
        )
    }
    const inputHandler = async (e: any) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const submitHandle = async (e: any) => {
        e.preventDefault();
        const response = await ChangePassword1({form,seterror});
        // console.log(response);
         if(response.status==true){
            alert("your password are changed");
            localStorage.removeItem("token1");
             setRunAuthCheck(true);             
         }

    }
    return (
        <>
         {runAuthCheck && <AuthChecker />}
            <Container maxWidth={'lg'} sx={{ alignContent: "center", minHeight: "100vh" }} >
                <Box sx={{ maxWidth: "900px", boxShadow: "0px 0px 10px", p: 4, mx: "auto", borderRadius: 3 }} >

                    <Box component={'form'} onSubmit={submitHandle} sx={{ width: "400px", mx: "auto" }}   >
                        <Link href={'/login'} className="underline underline-offset-3 text-blue-500" > <ArrowBack /> Login Page</Link>
                        <Box>

                            {user && (<Typography component={'span'} variant="h6" > {user.name}  </Typography>)}
                        </Box>
                        <Typography sx={{ mb: 3 }} >
                            Create New Password
                        </Typography>
                        <Error error={error} />
                        <PasswordInput value={form.password} onChange={inputHandler} name={"password"} placeholder={"Enter New Password"} label={"Password"} minlength={6} />
                        <PasswordInput value={form.confirmpassword} onChange={inputHandler} name={"confirmpassword"} placeholder={"Enter Confirm New Password"} label={"confirm Password"} />
                        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#499df0", "&:hover": { bgcolor: "#1976d2" } }} >Create </Button>

                    </Box>

                </Box>

            </Container>
        </>
    )
}