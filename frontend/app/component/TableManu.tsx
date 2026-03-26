import { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

 export default function TableMenu({ user }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    console.log("Edit user:", user.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <TableCell>
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
            console.log("Delete");
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
