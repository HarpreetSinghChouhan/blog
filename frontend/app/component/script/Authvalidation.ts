"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthCheker, CreateToken, verifyPasswordToken } from "@/lib/api";

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
export function PasswordForget({ email }: { email: String | null }) {
  const router = useRouter();
  useEffect(() => {
    const Get = async () => {
      const token = localStorage.getItem("token");
      const response = await CreateToken(email, token); // Pass the object here
      if (response?.status === true) {
        localStorage.setItem("token1", response.token);
        router.push("/forget-password/CreateNewPassword");
      }
    };

    Get();
  }, []);

  return null;
}
export function AuthChecker1({setuser}:{setuser:any}){
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const get = async () => {
      const response = await AuthCheker(token);
           
      if (response.message === "Unauthorized") {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
        // console.log(response.user);
        setuser(response.user);
    };
    get();
  }, []);
  return null;
}