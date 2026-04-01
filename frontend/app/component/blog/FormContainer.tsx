"use client"
import { Blogfind } from "@/lib/api";
import {  useEffect, useState } from "react";
import BlogForm from "../BlogForm";
import { Container } from "@mui/material";
import { blogEdit } from "@/app/AuthValidator";
import { navigation } from "@/lib/routes";
import Error from "../Error";
interface Form {
  title: String;
  slug: String;
  footer: String;
  image: File | null;
}
export default function FormContainer({ id }: any) {
  const [blog, setblog] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error,seterror] = useState<string[]>([]);
  const {go} = navigation();
  const [form1, setform1] = useState<Form>({
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
        setform1({
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
    setform1({
      ...form1,
      [name]: type === "file" ? files[0] : value,
    });
  };
  const handlesubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id",id)
    form.append("title", String(form1.title));
    form.append("slug", String(form1.slug));
    form.append("footer", String(form1.footer));
    form.append("content", String(content));
    form.append("_method", "PUT"); 
    if (form1.image) {
      form.append("image", form1.image);
    }
    console.log(form);
    blogEdit({form,go,seterror});
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
        <Error error={error} />
        <BlogForm handleinput={(e: any) => handleinput(e)} form={form1} content={content} setcontent={setcontent} handlesubmit={(e: any) => handlesubmit(e)} />
      </Container>
    </>
  )
}

