
const api = process.env.LARAVAL_API || "http://127.0.0.1:8000/api";
export async function ExportData(token: string | null) {
  try {
    const response = await fetch(`${api}/export/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();

    //  Create a temporary local1000 URL for the blob
    const url = window.URL.createObjectURL(blob);

    // // 3. Create a hidden 'a' tag and simulate a click
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Users.xlsx'); // Set the filename
    document.body.appendChild(link);
    link.click();

    // 4. Cleanup
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { status: true, message: "Download started" };
  } catch (error: any) {
    console.error("Export error:", error);
    return { status: false, message: error.message };
  }
}
export async function SimpleData(token: string | null) {
  try {
    const response = await fetch(`${api}/export`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
     if (!response.ok) {
       return await response;
     };
    //if (!response.ok) throw new Error("download Failed");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'simple.xlsx');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
    return { status: true, message: "Download Started" };
  }
  catch (error: any) {
    console.error("Simple Export error:", error);
    return { status: false, message: error.message };
  };
}
export const ImportData = async (token: string | null, formData: FormData) => {
    const response = await fetch(`${api}/import/user`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    });
    return response.json();
};
