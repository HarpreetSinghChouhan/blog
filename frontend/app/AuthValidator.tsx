// "use client"
import AdminRegister1, { AdminLogin1, AllDb, AllUB, AuthCheker, blogCreation, blogEditer, FindUser1, LoginPage, OneDelete, RegisterUserBloger, VerifyMail, VerifyOTP } from "@/lib/api";
import { ListItem } from "@mui/material";
import Error from "./script";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Props {
  formdata: any,
  go: Function,
  seterror: any,
  id:any,
}
interface Props1 {
  form: any,
  go: Function,
  seterror: any
}

export default async function Register1(
  go: Function,
  seterror: any,
  form: any,
) {
  //   console.log(form);/

  const response = await AdminRegister1(form);
  if (response.status == true) {
    let token = response.token;
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/`;
    go("/admin");
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function Login1(data: any, go: Function, seterror: any) {
  const response = await AdminLogin1(data);
  //   console.log(response);
  if (response.status == true) {
    let token = response.token;
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/`;
    go("/admin");
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function UserBlogerAdd(form: any, go: Function, seterror: any) {
  let token = localStorage.getItem("token");
  const response = await RegisterUserBloger(form, token);
  // console.log(response);
  if (response.status == true) {
    go("/admin");
    return null;
  } else {
    Error(response, seterror);
  }
}
export async function GetUsers(setusers: any | [], mode: string | null) {
 
  //  token = JSON.stringify(token);
  useEffect(() => {
     let token = localStorage.getItem("token");
    const Get = async () => {
      const res = await AllUB(token, mode);
      setusers(res.user);
      //  console.log(res);
    }
    Get();
  }, [])

  return null;
  //  return response.user;
}
export async function Login2(data: any, go: Function, seterror: any) {
  const response = await LoginPage(data, "login");
  //   console.log(response);
  if (response.status == true) {
    //  console.log("Hello Every One");
    // let token = response.token;
      if(response.message == "success"){
        alert("Verify email and login")
        go("/emailverify");
      }
    // localStorage.setItem("token", token);
    // document.cookie = `token=${token}; path=/`;
    // if (response.role.name == "bloger") {
    //   go("/bloger");
    // }
    // else if (response.role.name == "user") {
    //   go("/user");
    // }

    return null;
  } else {
    Error(response, seterror);
  }
}
export async function blogCreate(data: any, go: Function, seterror: any) {
  const token = localStorage.getItem("token");
  const response = await blogCreation(data, token, "blogcreate");
  console.log(response);
  if (response.status == true) {
    go("/bloger/status")
    if (response.role == "bloger") {
      go("/bloger");
    }
    else if (response.role == "user") {
      go("/user");
    }

    return null;
  } else {
    Error(response, seterror);
  }
}
export function Blog(setblog: any, mode: string | null) {
  const router = useRouter();
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) return;
    const GetData = async () => {
      const response = await AllUB(token, mode);
      //  console.log("Api response ");
      if (response.message == "Unauthorized") {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      setblog(response.blogs);
      //  console.log(response);
    };
    GetData();
  }, []);
  return null;
}

export async function Delete(url: string | null, id: any) {
  const token = localStorage.getItem("token");
  if (!token) return;
  const res = await OneDelete({ id, token, url });
  return res;

}
export async function UserBlogerEdit({ formdata, go, seterror,id }: Props) {
  const token = localStorage.getItem("token");
  if (!token) return;
  const data = formdata;
  const url = `user/${id}`;
  const res = await AllDb({ data, token, url });
  console.log(res);
    if(res== false){
      Error(res,seterror);  
    }
    else{
      go("/admin");
    }
}
export function useAuthCheckBloger() {
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
    };
    get();
  }, [router]);
}
export async function blogEdit({ form, go, seterror }: Props1) {
  const token = localStorage.getItem("token");
  const response = await blogEditer({ form, token });
  console.log(response);
  if (response.status == false) {
    Error(response, seterror);
  }
  else {
    alert("Blog Are Updated");
    go("/bloger/status");
  }
}
export function FindUser({ id, setform }: any) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const Get = async () => {
      const response = await FindUser1(id, token);
      let user = response.message
      console.log(user);
      setform({
        name: user.name,
        email: user.email,
        role: user.role.name,
      })
    }
    Get();
  }, [])
}


export async function VerifyEmail({ formdata, setstatus, seterror }: any) {
  try {
    const response = await VerifyMail(formdata);
    if (response?.status === true) {
      setstatus(true);
      return response;
    } else {
      Error(response, seterror);
      return response;
    }

  } catch (err) {
    console.log("VerifyEmail Error:", err);
    seterror(["Something went wrong"]);
    return null;
  }
}
export async function VerifyOtp({ formdata, seterror }: any) {
  try {
    const response = await VerifyOTP(formdata);

    if (response?.status === true) {
      return response;
    } else {
      Error(response, seterror);
      return response;
    }

  } catch (err) {
    console.log("VerifyOtp Error:", err);
    seterror(["Something went wrong"]);
    return null;
  }
}