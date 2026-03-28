import { Table, TableHead, TableRow, TableCell } from "@mui/material";
import TableBodyBloger from "../TableBodybloger";

export default function TableComponent( {blogs ,setblogs}:any){
    return(
        <>
          <Table >
            <TableHead>
                <TableRow>
                    <TableCell> ID </TableCell>
                    <TableCell> Title </TableCell>
                    <TableCell> Footer </TableCell>
                    <TableCell> Content </TableCell>
                    <TableCell>Status </TableCell>
                    <TableCell>Created_at</TableCell>
                    <TableCell>Action </TableCell>
                </TableRow>
            </TableHead>
            <TableBodyBloger blogs={blogs} setblogs={setblogs} />
        </Table>
        </>
    )
}