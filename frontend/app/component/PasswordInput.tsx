"use client";

import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,

} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material"
import { fieldStyles } from "../admin/addblogeruser/page";
interface PasswordType {
  value:String | null,
  onChange:any,
  name:string,
  placeholder:string,
  label:String | null,
  minlength?: number | String | null
}

export default function PasswordInput({ value, onChange, name, placeholder, label,  }: PasswordType) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <>

      <TextField
        label={label}
        placeholder={placeholder}
        name={name}
        type={showPassword ? "text" : "password"}
        size="small"
        value={value}
        onChange={onChange}
        fullWidth
        required
        sx={{ ...fieldStyles, mb: 1 }}
        
        InputProps={{        
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ fontSize: 18, color: "#A0AAB8" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
                sx={{ color: "#A0AAB8" }}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
