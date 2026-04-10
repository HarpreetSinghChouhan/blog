import { Box, Button, TextField, Typography, InputLabel } from "@mui/material";
import TipTapEditor from "./tiptapeditor";

interface Props {
  handleinput: Function;
  form: any;
  content: string;
  setcontent: (html: string) => void;
  handlesubmit: Function;
}

export const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#F8F9FC",
    fontSize: "0.9rem",
    transition: "all 0.2s ease-in-out",
    "&:hover fieldset": {
      borderColor: "#4F6EF7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4F6EF7",
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4F6EF7",
  },
};

export default function BlogForm({
  handleinput,
  form,
  content,
  setcontent,
  handlesubmit,
}: Props) {
  return (
    <Box
      component="form"
      sx={{ p: { xs: 2, sm: 0 } }}
      onSubmit={(e) => handlesubmit(e)}
      encType="multipart/form-data"
    >
      <TextField
        required
        placeholder="e.g. The Future of AI"
        label="Blog Title"
        fullWidth
        variant="outlined"
        name="title"
        size="small"
        sx={{ ...fieldStyles, mb: 3 }}
        value={form.title}
        onChange={(e) => handleinput(e)}
      />

      <TextField
        required
        fullWidth
        variant="outlined"
        placeholder="e.g. future-of-ai"
        label="Slug / URL Path"
        name="slug"
        size="small"
        sx={{ ...fieldStyles, mb: 3 }}
        value={form.slug}
        onChange={(e) => handleinput(e)}
      />

      <TextField
        required
        fullWidth
        variant="outlined"
        placeholder="Short footer summary"
        label="Footer Text"
        name="footer"
        size="small"
        sx={{ ...fieldStyles, mb: 3 }}
        value={form.footer}
        onChange={(e) => handleinput(e)}
      />

      <Box sx={{ mb: 3 }}>
        <InputLabel sx={{ mb: 1, fontSize: "0.85rem", fontWeight: 600, color: "#5a5a6e" }}>
          Feature Image
        </InputLabel>
        <input
          className="border border-dashed border-gray-300 rounded-xl w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          type="file"
          name="image"
          accept="image/*"
          onChange={(e: any) => handleinput(e)}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <InputLabel sx={{ mb: 1, fontSize: "0.85rem", fontWeight: 600, color: "#5a5a6e" }}>
          Content
        </InputLabel>
        <Box sx={{ 
          border: "1px solid #E0E4EC", 
          borderRadius: "12px", 
          overflow: "hidden",
          "&:focus-within": { borderColor: "#4F6EF7" }
        }}>
          <TipTapEditor
            placeholder="Write your story here..."
            value={content}
            onChange={setcontent}
          />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 14px rgba(102,126,234,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a72d6 0%, #6a4294 100%)",
            boxShadow: "0 6px 20px rgba(102,126,234,0.5)",
            transform: "translateY(-1px)",
          },
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

