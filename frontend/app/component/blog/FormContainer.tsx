"use client"
import { Blogfind } from "@/lib/api";
import {  useEffect, useState } from "react";
import BlogForm from "../BlogForm";
import { Container } from "@mui/material";
import { blogEdit } from "@/app/AuthValidator";
import { navigation } from "@/lib/routes";
interface Form {
  title: String;
  slug: String;
  footer: String;
  image: File | null;
}
export default function FormContainer({ id }: any) {
  const [blog, setblog] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error,seterror] = useState<React.ReactNode[]>([]);
  const {go} = navigation();
  const [form, setform] = useState<Form>({
    title: "",
    slug: "",
    footer: "",
    image: null,
  });
  const [content, setcontent] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const get = async () => {
      try {
        const data = await Blogfind(id, token);
        let d = data.data;
        setblog(d);
        setform({
          title: d.title ?? "",
          slug: d.slug ?? "",
          footer: d.footer ?? "",
          image: null,
        });
        setcontent(d.content ?? "");
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);
  const handleinput = (e: any) => {
    const { name, value, type, files } = e.target;
    setform({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };
  const handlesubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", String(form.title));
    formData.append("slug", String(form.slug));
    formData.append("footer", String(form.footer));
    formData.append("content", String(content));
    if (form.image) {
      formData.append("image", form.image);
    }
    blogEdit({formData,go,seterror});
  }
  if (loading) {
    return (
      <Container maxWidth="lg">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth={'lg'} >
        <BlogForm handleinput={(e: any) => handleinput(e)} form={form} content={content} setcontent={setcontent} handlesubmit={(e: any) => handlesubmit(e)} />
      </Container>
    </>
  )
}

