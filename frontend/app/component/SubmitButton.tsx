import { Button } from "@mui/material";

export default function SubmitButton({text}:{text:String | null}){
return(
    <>
        <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, #6db7ff 0%, #2f70af  100%)",
                      borderRadius: "10px",
                      py: 1.2,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textTransform: "none",
                      letterSpacing: "0.2px",
                      boxShadow: "0 6px 20px rgba(79,110,247,0.35)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2f70af 0%, #6db7ff 100%)",
                        boxShadow: "0 8px 28px rgba(79,110,247,0.45)",
                      },
                    }}
                  >
                    {text}
                  </Button>
        </>
    )
}