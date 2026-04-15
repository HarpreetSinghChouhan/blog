
import { Button } from "@mui/material";
import { Style } from "./Exportbutton";
import { ImportExport } from "@mui/icons-material";
import { useRef, useContext } from "react";
import { ImportData } from "@/lib/excel/api"; // Ensure you create/import this function
import { usePathname } from "next/navigation";
import { TabContext } from "../../admin/context/TabContext";
import { BloggerTabContext } from "../../bloger/context/Provider";

export default function ImportButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const adminContext = useContext(TabContext);
    const blogerContext = useContext(BloggerTabContext);

    // Get the active context based on route
    const context = pathname.startsWith("/admin") ? adminContext : blogerContext;

    const handleButtonClick = () => {
        // This triggers the hidden file input
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = localStorage.getItem("token");

        // Prepare FormData for the API
        const formData = new FormData();
        formData.append("file", file);

        // Start progress indicator
        if (context) {
            context.setIsImporting(true);
            context.setProgress(0);
        }

        try {
            const data = await ImportData(token, formData);
          if (data.status === true) {
            alert("File imported successfully!");
            console.log("Success:", data);
            window.location.reload(); 
        } else {
            // This handles the "Email must be unique" error from Laravel
            alert("Import Error: " + data.message);
        }
            // Optional: window.location.reload() to show new data
        } catch (error) {
            console.error("Import failed:", error);
            alert("Failed to import file.");
            if (context) {
                context.setIsImporting(false);
                context.setProgress(0);
            }
        }
    };

    return (
        <>
            {/* Hidden Input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv"
            />

            <Button
                variant="outlined"
                sx={Style}
                onClick={handleButtonClick}
            >
                <ImportExport /> Import File
            </Button>
        </>
    );
}
