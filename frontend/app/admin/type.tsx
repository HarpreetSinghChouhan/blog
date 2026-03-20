'use client'
import { Group, Notes, PendingActions, Person } from "@mui/icons-material";
import { useState } from "react";
 export const tabpanelv = [{id:0,name:"blog",value:<Notes />},{id:1,name:"user",value:<Group />},{id:2,name:"bloger",value:<PendingActions />} ]  
export const [tabvalue,settabvalue] = useState(0);