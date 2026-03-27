"use client";
import { Blog } from "@/app/AuthValidator";
import TableMenuAdmin from "@/app/component/admin/TableMenu";
import AppBar1 from "@/app/component/AppBar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
export const stripHtml = (html: any) => {
  if (typeof window === "undefined") return html; // SSR safety
  const doc = new DOMParser().parseFromString(html, "text/html");
   let content = doc.body.textContent || "";
   return  content.slice(0,50)+"....";
};
export default function Blogs() {
  const [blogs, setblogs] = useState<any[]>([]);

  const res = Blog(setblogs, "allblogs");
  console.log(blogs);
  return (
    <>
      
        <Typography
          variant="h5"
          component={"div"}
          sx={{ textAlign: "center", my: 4 }}
        >
          {" "}
          Welcome One Blogs page{" "}
        </Typography>
        <Box sx={{ display: "flex", px: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Id </TableCell>
                <TableCell>Title</TableCell>
                <TableCell> Content </TableCell>
                <TableCell>Bloger Name</TableCell>
                <TableCell>Bloger Email</TableCell>
                <TableCell> Footer</TableCell>
                <TableCell>Created_at</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs && blogs.length> 0 ?
                blogs.map((blog: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{stripHtml(blog.content)}</TableCell>
                    <TableCell>{blog.user.name}</TableCell>
                    <TableCell>{blog.user.email}</TableCell>
                    <TableCell>{blog.footer}</TableCell>
                    <TableCell>
                      {new Date(blog.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>{blog.status}</TableCell>
                    <TableCell>
                      <TableMenuAdmin
                        blog={blog}
                        setblogs = {setblogs}
                        onStatusChange={(updatedBlog) => {
                          setblogs((prev) =>
                            prev.map((b) =>
                              b.id === updatedBlog.id ? updatedBlog : b,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    {/* "Action BUtton" */}
                  </TableRow>
                )):(
                  <TableRow>
                    <TableCell sx={{textAlign:"center"}}  colSpan={9} >
                      nothing blogs
                    </TableCell>
                  </TableRow>
                )
                }
            </TableBody>
          </Table>
        </Box>
    </>
  );
}
