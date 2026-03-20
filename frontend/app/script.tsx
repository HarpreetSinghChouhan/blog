import { ListItem } from "@mui/material";

export default function Error(response:any,seterror:any){
     const res = response.message;
    let list: React.ReactNode[] = [];
    if (typeof res === "string") {
      list = [<ListItem key="msg">{res}</ListItem>];
    } else {
      Object.values(res).map((message: any) => {
        message.map((value: any, key: any) => {
          list.push(<ListItem key={key}>{value}</ListItem>);
        });
      });
    }
    seterror(list);
}