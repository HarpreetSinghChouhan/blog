import BlogContent from "@/app/component/BlogContent";
import { ArrowBack, ArrowRightAltRounded } from "@mui/icons-material";
import { Container } from "@mui/material";
import Link from "next/link";

export default async function ViewBlog({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <Container maxWidth="md" sx={{ border: "1px solid black", p:{md:3,xs:0}  }}>
        <Link href={'/admin/blogs'} className="" ><ArrowBack /> Back </Link>
      <BlogContent id={id} />
    </Container>
  );
}