
interface Props {
    data: FormData,
    token: string | null,
    url: string | null,
}
interface Onedele {
    id: string | null,
    token: string | null,
    url: string | null,
}
interface prop1 {
    form:FormData,
    token: string | null,
}
const api = process.env.LARAVAL_API || "http://127.0.0.1:8000/api";
export async function Logout(token: FormData) {
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
export default async function AdminRegister1(data: FormData) {
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
export async function AdminLogin1(data: FormData) {
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
export async function RegisterUserBloger(data: FormData, token: string | null) {
    const response = await fetch(`${api}/registerub`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    return res;
}
// mode: string | null
export async function AllUB(token: string | null) {
    const response = await fetch(`https://bit.ly/4thfUrp`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        
    })
    const res = response.json();
    return res;
}

export async function LoginPage(data: FormData, url: string | null) {
    const response = await fetch(`${api}/${url}`, {
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
export async function blogCreation(data: FormData, token?: string | null, url?: string) {
    const response = await fetch(`${api}/${url}`, {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: data,
    })
    const res = await response.json();
    return res;
} export async function ChangeStatus(data: FormData, token: string | null) {
    const response = await fetch(`${api}/blogerchange`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        body: data,
    })
    const res = await response.json();
    return res;
}
export async function Delete(data: FormData, token: string | null) {
    const response = await fetch(`${api}/deleteblog`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        body: data,
    })
    const res = response.json();
    return res;
}
export async function Blogfind(id: string | null, token: string | null) {
    const res = await fetch(`${api}/blog/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    return await res.json();
};
export async function BlogfindSlug(slug: string | null, token: string | null) {
    const res = await fetch(`${api}/blog/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    return await res.json();
};

export async function OneDelete({ id, token, url }: Onedele) {
    const response = await fetch(`${api}/${url}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    })
    const res = response.json();
    return res;
}
export async function AllDb({ data, token, url }: Props) {
    const response = await fetch(`${api}/${url}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: data,
    })
    const res = await response.json();
    return res;
}
export async function AuthCheker(token: string | null) {
    const response = await fetch(`${api}/authication`, {
        method: "Get",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    const res = await response.json();
    return res;
}
export async function verifyPasswordToken(email:string | null,token:string | null,token1:string | null) {
    const response = await fetch(`${api}/check-password-token`, {
        method: "POST", 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token1}`,
        },
        body:  JSON.stringify({email, token})
    });

    return await response.json();
}

export async function CreateToken(email:string | null, token: string | null) {
    const response = await fetch(`${api}/create`,{
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body:JSON.stringify({email}),
    });
    const res =  await response.json();
    return res;
    
}
export async function blogEditer({ form, token }: prop1) {
    const response = await fetch(`${api}/blogedit`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: form
    })
    const res = await response.json();
    return res;
}
export async function FindUser1(id: FormData, token: string | null) {
    const response = await fetch(`${api}/user/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }

    });
    const res = await response.json();
    return res;

}
export async function VerifyMail(formdata: FormData) {
    const response = await fetch(`${api}/verifyemail`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        },
        body: formdata,
    });
    const res =await response.json();
    return res;
}
export async function VerifyOTP(formdata: FormData) {
    const response = await fetch(`${api}/verifyotp`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        },
        body: formdata,
    });
    const res = await response.json();
    return res;
}
export async function ChangePassword(form:FormData,token1:string|null) {
 const response = await fetch(`${api}/changepassword`,{
    method:"PATCH",
    headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token1}`,
    },
    body:JSON.stringify(form),
 })   
 const res = await response.json();
 return res;
}
