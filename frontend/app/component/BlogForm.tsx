import { Box, Button, TextField, Typography } from "@mui/material";
import TipTapEditor from "./tiptapeditor";
interface props {
  handleinput: Function;
  form: any;
  content: string;
  setcontent: (html: string) => void;
  handlesubmit:Function,
}
export default function BlogForm({
  handleinput,
  form,
  content,
  setcontent,
  handlesubmit,
}: props) {
  return (
    <>
      <Box component={"form"} sx={{ p: 3 }}  onSubmit={(e)=>handlesubmit(e)} >
        <TextField
          required
          placeholder="Enter Title"
          label="Title"
          fullWidth
          variant="outlined"
          name="title"
          type="text"
          size="small"
          sx={{ my: 1 }}
          value={form.title}
          onChange={(e)=>{handleinput(e)}}
        />
        <TextField
          required
          fullWidth
          variant="outlined"
          placeholder="Enter Slug"
          label="slug"
          name="slug"
          type="text"
          size="small"
          sx={{ my: 1 }}
          value={form.slug}
          onChange={(e) => {
            handleinput(e);
          }}
        />      
           <TextField
          required
          fullWidth
          variant="outlined"
          placeholder="Enter Footer Text"
          label="Footer"
          name="footer"
          type="text"
          size="small"
          sx={{ my: 1 }}
          value={form.footer}
          onChange={(e) => {
            handleinput(e);
          }}
        />
        <Typography component={"span"} sx={{ ml: 1 }}>
          {" "}
          Select Image{" "}
        </Typography>

        <TextField
          type="file"
          required
          fullWidth
          variant="outlined"
          placeholder="Enter Slug"
          name="file"
          size="small" 
          sx={{ mb: 1, mt: -0.2 }}
          inputProps={{accept: "image/*"}}
        //    inputProps={{ accept: "image/*" }}
          onChange={(e) => {
            handleinput(e);
          }}
        />
        <Box sx={{ my: 1 }}>
          <Typography >
            write Content :--
          </Typography>
          <TipTapEditor
            placeholder={"Enter Content for Bloger"}
            value={content}
            onChange={setcontent}
          />
        </Box>
          <Button type="submit" variant="outlined" fullWidth >
            Create Blog
          </Button>

      </Box>
    </>
  );
}
