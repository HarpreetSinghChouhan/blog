
import { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChangeStatus } from "@/lib/api";

export default function TableMenuAdmin(blog: any){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 
  const open = Boolean(anchorEl);
  let  blog1 = blog?.blog; 
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    console.log("Edit Blog:", blog);
    
  };
  const handleview = () => {
    console.log("View Blog", blog)
  }
  const handlePublish = async () => {
  
    console.log("Publish Blog",blog1.id);
     const form = new FormData();
     form.append("blogid",blog1.id);
          const token = localStorage.getItem("token");
      const res =  await ChangeStatus(form,token);
      console.log(res);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <>
      {/* Button (3 dots) */}
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      {/* Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}> 
        <MenuItem
          onClick={() => {
            console.log("Delete");
            handleview();
          }}
        >View</MenuItem>
       {/* {  blog && (() =>   {
           if(blog1.status !==  "published"){ */}
            <MenuItem
          onClick={() => {
            handlePublish();
          }}
        >
          publish
        </MenuItem>
       {/* };
    }
       ) } */}
       
        
        {/* <MenuItem
          onClick={() => {
            console.log("Edit");
            handleEdit();
          }}
        >
          Edit
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            console.log("Delete");
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {/* </TableCell> */}
    </>
  )
}