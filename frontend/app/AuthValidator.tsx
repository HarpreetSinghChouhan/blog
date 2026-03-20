import AdminRegister1, { AdminLogin1 } from "@/lib/api";
import { ListItem } from "@mui/material";
import Error from "./script";

export default async function Register1(
  go: Function,
  seterror: any,
  form: any,
) {
  //   console.log(form);/

  const response = await AdminRegister1(form);
  //   console.log(response);
  if (response.status == true) {
    // console.log(response);
    let token = response.token;
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/`;
    go("/admin");
    return null;
  } else {
    Error(response,seterror);
}
}
export async function Login1(data: any, go: Function, seterror: any) {
  const response = await AdminLogin1(data);
  //   console.log(response);
  if (response.status == true) {
    // console.log(response);
    let token = response.token;
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/`;
    go("/admin");
    return null;
  } else {
    Error(response,seterror);
  };
}
