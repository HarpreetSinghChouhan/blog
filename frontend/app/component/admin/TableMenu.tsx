
import { useState } from "react";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChangeStatus, Delete } from "@/lib/api";
import { useRouter } from "next/navigation";
interface TableMenuAdminProps {
  blog: any;
  setblogs : any;
  onStatusChange: (updatedBlog: any) => void;
  
}
export default function TableMenuAdmin({blog,setblogs,onStatusChange,}:TableMenuAdminProps){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const form = new FormData();
      form.append("blogid", blog.id);
    const router = useRouter();
      const token = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  let  blog1 = blog?.blog; 
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    console.log("Edit Blog:", blog);
    
  };
  const handleview = () => {
    // console.log("View Blog", blog)
        router.push(`/admin/blogs/${blog.id}`)
  }
  const handlePublish = async () => {
    try {
      console.log("Publishing Blog:", blog.id);

    
      const res = await ChangeStatus(form, token);

      if (res) {
        onStatusChange({ ...blog, status: "published" });
        console.log("Status changed successfully:", res);
      }
    } catch (error) {
      console.error("Failed to publish blog:", error);
    } finally {
      handleClose();
    }
  };
  const Delete1 = async(id:any) =>{
     const res =await  Delete(form,token);
        console.log(res);
        if(res.status == false){
          alert(res.message);
        }
        else{
          alert("blog are deleted ");
           setblogs((prev: any[]) => prev.filter((blog: {id:any}) => blog.id !== id));
        }
  }
  const handleClose = async() => {
   
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
            // console.log("Delete");
            handleview();
          }}
        >View</MenuItem>
       {blog.status !== "published" && (
          <MenuItem onClick={handlePublish}>
            Publish
          </MenuItem>
        )}
        
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
          if(confirm("Are are Realy want delete This ")){
             Delete1(blog.id);
        // 
         
      };
            // handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {/* </TableCell> */}
    </>
  )
}


