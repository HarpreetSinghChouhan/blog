"use client";
import { PagesOutlined } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Skeleton,
  Button,
} from "@mui/material";
import { ReactNode } from "react";
import ImportButton from "../script/ImportButton";
import ExportButton from "../script/Exportbutton";
import SimpleButton from "../script/SimpleButton";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
  render?: (row: any, index: number) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
  loading?: boolean;
}

export default function DataTable({
  columns,
  rows,
  emptyMessage = "No data available",
  loading = false,
}: DataTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        backgroundColor: "#fff",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 280px)",
          "&::-webkit-scrollbar": {
            width: 6,
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.15)",
          },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow >
           <TableCell colSpan={columns.length} >
               {
                <Box 
                sx={{display:"flex",justifyContent:"right"}} >
                    <ImportButton /> <ExportButton /> <SimpleButton />
                </Box>
               }
           </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || "left"}
                  sx={{
                    backgroundColor: "#fafbfc",
                    borderBottom: "2px solid #eef0f2",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "#8e8ea0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    py: 1.8,
                    px: 2.5,
                    whiteSpace: "nowrap",
                    minWidth: col.minWidth,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {loading
              ? /* Loading Skeletons */
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {columns.map((col) => (
                      <TableCell key={col.id} sx={{ py: 2, px: 2.5 }}>
                        <Skeleton
                          variant="text"
                          height={24}
                          width={`${60 + Math.random() * 30}%`}
                          animation="wave"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : rows && rows.length > 0
              ? rows.map((row, index) => (
                  <TableRow
                    key={row.id || index}
                    sx={{
                      "&:last-child td": { borderBottom: 0 },
                      "&:hover": {
                        backgroundColor: "rgba(102,126,234,0.03)",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        align={col.align || "left"}
                        sx={{
                          py: 2,
                          px: 2.5,
                          borderBottom: "1px solid #f3f4f6",
                          fontSize: "0.88rem",
                          color: "#3a3a4a",
                        }}
                      >
                        {col.render ? col.render(row, index) : row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : /* Empty State */
                (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      sx={{ py: 8, textAlign: "center", borderBottom: 0 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        {/* <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            backgroundColor: "#f5f5f7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                          }}
                        >
                        <Typography sx={{ fontSize: 28 }}>
                        <PagesOutlined />
                            
                          </Typography>
                        </Box> */}
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#8e8ea0",
                            fontWeight: 600,
                          }}
                        >
                          {emptyMessage}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#b0b0c0", fontSize: "0.82rem" }}
                        >
                          Data will appear here once available
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
