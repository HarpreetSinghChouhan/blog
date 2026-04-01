
import { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete } from "../AuthValidator";
import { useRouter } from "next/navigation";

 export default function TableMenu({ user,setusers }: any) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    console.log("Edit user:", user.id);
    router.push(`/admin/edit/${user.id}`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const handleDelete = async (id:any) =>{
  if(confirm(`are you want to Delete ${user.email}`)){
     const response = await Delete("user",user.id);
  // console.log(response);
  if(response.status == true){
    setusers((prev:any[])=>prev.filter((user:{id:any})=>user.id !== id));
  }
  }
 }
  return (
    
    <>
      {/* Button (3 dots) */}
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            console.log("Edit");
            handleEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            // console.log("Delete");
            handleDelete(user.id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {/* </TableCell> */}
    </>
  );
}

// export default TableMenu;
