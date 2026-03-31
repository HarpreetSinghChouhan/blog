// "use client"
import { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete } from "../../AuthValidator";
import { useRouter } from "next/navigation";

 export default function TableMenuBloger({ blog,setblogs,go }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    // console.log("Edit user:", blog.id);
    // const router = useRouter();
    go(`/bloger/status/${blog.id}`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const handleDelete = async (id:any) =>{
  const response = await Delete("blog",blog.id);
  // console.log(response);
  if(response.status == true){
    setblogs((prev:any[])=>prev.filter((blog:{id:any})=>blog.id !== id));
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
            handleDelete(blog.id);
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
