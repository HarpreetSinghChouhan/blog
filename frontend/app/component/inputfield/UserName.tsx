"use client";

import { useState } from "react";
import {
    TextField,
    IconButton,
    InputAdornment,

} from "@mui/material";
import { PersonOutline as PersonOutlineIcon } from "@mui/icons-material";
import { fieldStyles } from "@/app/admin/addblogeruser/page";

interface UserName {
    value: String | null,
    onChange: any,
    name: string,
    placeholder: string,
    label: String | null,
    minlength?: number | String | null
}

export default function UserInput({ value, onChange, name, placeholder, label, minlength }: UserName) {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            name={name}
            type="text"
            size="small"
            value={value}
            onChange={onChange}
            fullWidth
            required
            sx={{ ...fieldStyles, mb: 2 }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ fontSize: 18, color: "#A0AAB8" }} />
                    </InputAdornment>
                ),
            }}
        />
    )
}
export function UserEmailInput({ value, onChange, name, placeholder, label, minlength }: UserName){
    return(
        <TextField
            label={label}
            placeholder={placeholder}
            name={name}
            type="email"
            size="small"
            value={value}
            onChange={onChange}
            fullWidth
            required
            sx={{ ...fieldStyles, mb: 2 }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ fontSize: 18, color: "#A0AAB8" }} />
                    </InputAdornment>
                ),
            }}
        />
    )
}