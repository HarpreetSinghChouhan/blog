"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthCheker } from "@/lib/api";

export function AuthChecker() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const Get = async () => {
      const response = await AuthCheker(token);
      console.log(response);

      if (response?.status === true) {
        const role = response.user.role.name;

        if (role === "admin") {
          router.push('/admin');
        } else if (role === "bloger") {
          router.push('/bloger');
        } else if (role === "user") {
          router.push('/user');
        }
      }
    };

    Get();
  }, []);

  return null;
}
export function  PasswordForget(){
    const  router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const Get = async () => {
      const response = await AuthCheker(token);
      console.log(response);

      if (response?.status === true) {
          router.push("/CreateNewPassword");
      }
      
    };

    Get();
  }, []);

  return null;
}