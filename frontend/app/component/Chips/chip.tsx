import { Chip } from "@mui/material";

export default function NumberChip({ count }: { count: number }) {
    return (
        <>
            <Chip
                label={count}
                size="small"
                sx={{
                    backgroundColor: "#65e0c6ff",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    height: 26,
                    minWidth: 26,
                    borderRadius: "8px",
                }}
            />
        </>
    )
}
export const  BadgeChip = ({ badge }: { badge: string | null }) => {
    return(
        <>
            <Chip
                label={badge}
                size="small"
                sx={{
                    backgroundColor: "rgba(102,126,234,0.1)",
                    color: "#667eea",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: 24,
                    borderRadius: "8px",
                }}
            />
        </>
    )
}
