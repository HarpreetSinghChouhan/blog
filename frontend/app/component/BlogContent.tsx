"use client";
import { Blogfind } from "@/lib/api";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import BlogImage from "./blog/Image";
import BlogTitle from "./blog/BlogTitle";
import BlogContent1 from "./blog/BlogContent1";
import BlogFooter from "./blog/BlogFooter";
export default function BlogContent({ id }: { id: String | null }) {
  // const url =  process.env.LARAVAL_IMAGES
  // console.log("New Valueb Of Id  for view",id);
  const [blog, setblog] = useState<any>();
  useEffect(() => {
    const get = async () => {
      const token = localStorage.getItem("token");
      const data = await Blogfind(id, token);
      setblog(data.data);
      // console.log(data);
    };
    get();
  }, [id]);
  return (
    <>
      {/* {console.log(blog)} */}
      <Box>
        {blog &&
            (
            <Box >
              <BlogImage src={blog.image_url} title={blog.title} />
              <BlogTitle title={blog.title} />
              <BlogContent1 content={blog.content} />
              <BlogFooter footer={blog.footer} />
            </Box>
          )}
      </Box>
    </>
  );
}
