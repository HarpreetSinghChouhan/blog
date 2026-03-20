"use client";

import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordInput({ value, onChange,name,placeholder,lable,minlength }: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
   
      <TextField
      required
        fullWidth
        label={lable}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        
        sx={{my:1}}
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        // slotProps={ {
        //   htmlInput:{
        //     minLength:{minlength}
        //   }}
        // }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    
  );
}
