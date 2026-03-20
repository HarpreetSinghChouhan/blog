
const api = process.env.LARAVAL_API || "http://127.0.0.1:8000/api";
export async function Logout(token: any) {
    const response = await fetch(`${api}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
    const res = await response.json();
    return res;
};
export default async function AdminRegister1(data: any) {
    const response = await fetch(`${api}/adminregister`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}
export  async function AdminLogin1(data: any) {
    const response = await fetch(`${api}/adminlogin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}