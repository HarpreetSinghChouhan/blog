"use client";
import { useEffect } from "react";
import { getEcho } from "@/lib/echo";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function RealTimeNotificationListener() {
  const router = useRouter();

  useEffect(() => {
    const echo = getEcho();
    if (!echo) return;

    // Listen to the public 'blogs' channel for the 'blog.published' event alias
    const channel = echo.channel("blogs");
    channel.listen(".blog.published", (event: any) => {
      console.log("New Broadcast Received:", event);
      
      const blogTitle = event?.blog?.title || "A new blog";
      const slug = event?.blog?.slug || event?.blog?.id;
      
      toast.success(
        (t) => (
          <div 
            onClick={() => {
              router.push(`/articles/${slug}`);
              toast.dismiss(t.id);
            }}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
          >
            <span style={{ fontWeight: 'bold' }}>New Article Published!</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>{blogTitle}</span>
            <span style={{ fontSize: '0.8rem', color: '#667eea', marginTop: '4px', textDecoration: 'underline' }}>
              Click to Read More
            </span>
          </div>
        ),
        {
          duration: 6000,
          position: "top-right",
          style: {
            borderRadius: '12px',
            background: '#fff',
            color: '#333',
            border: '1px solid rgba(102,126,234,0.2)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            minWidth: '250px'
          },
        }
      );
    });

    return () => {
      channel.stopListening(".blog.published");
    };
  }, []);

  return <Toaster />;
}
