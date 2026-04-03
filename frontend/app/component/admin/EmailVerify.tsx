import { Box, Button, TextField, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Error from "../Error";
 interface Types{
  handleSubmit:any,
  error:string[],
  handleinput:any,
  handleChange:any,
  form:any,
  otp:any,
  loading:boolean,
  status:boolean,
} 
export default function EmailVerification({handleSubmit,error,handleinput,handleChange,form,otp,loading,status}:Types) {
    return (
        <>
           <Box component={'form'} maxWidth={"400px"} sx={{ mx: "auto" }} onSubmit={handleSubmit}>
                       <Error error={error} />
                       <Typography sx={{ mb: 2, textAlign: "center" }}>
                         Verify
                         <Typography component={'span'} sx={{ mr: 1 }}>
                           {status ? " Otp" : " Email"}
                         </Typography>
                       </Typography>
                       <TextField
                         name="email" type="email" label="Email"
                         onChange={handleinput} sx={{ my: 1 }}
                         required fullWidth value={form.email}
                       />
                       {status && (
                         <Box sx={{ my: 1, mx: 2 }}>
                           <Typography>Fill Correct Otp :-</Typography>
                           <MuiOtpInput value={otp} onChange={handleChange} length={6} autoFocus />
                         </Box>
                       )}
                       <Button
                         type="submit" fullWidth variant="contained"
                         disabled={loading}
                         sx={loading ? { bgcolor: "#c0c0c0" } : {}}
                       >
                         <Typography sx={{ m: 1 }}>
                           {loading ? "Loading..." : `Verify ${status ? "Otp" : "Email"}`}
                         </Typography>
                       </Button>
                     </Box>
        </>
    )
}