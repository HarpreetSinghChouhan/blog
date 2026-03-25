"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import { Box, IconButton, Tooltip } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LinkIcon from "@mui/icons-material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
export default function TipTapEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  placeholder: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    autofocus: "end",
    editable: true,

    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Link,
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.isFocused) return;
    const editorHTML = editor.getHTML();

    if (value !== editorHTML) {
      editor.commands.setContent(value || "<p></p>", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) return null;

  const btnStyle = (active: boolean) => ({
    color: active ? "white" : "#555",
    bgcolor: active ? "primary.main" : "transparent",
    borderRadius: 1,
    "&:hover": {
      bgcolor: active ? "primary.dark" : "rgba(0,0,0,0.06)",
    },
  });
  return (
    <Box
      sx={{
        border: "1px solid #dcdcdc",
        borderRadius: 2,
        overflow: "hidden",
        "&:focus-within": {
          borderColor: "primary.main",
          boxShadow: "0 0 0 1px rgba(25,118,210,0.4)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          px: 1,
          py: 0.5,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "#fafafa",
        }}
      >
        <Tooltip title="Undo">
          <IconButton
            size="small"
            sx={btnStyle(false)}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <UndoIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton
            size="small"
            sx={btnStyle(false)}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <RedoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bold">
          <IconButton
            size="small"
            sx={btnStyle(editor.isActive("bold"))}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton
            size="small"
            sx={btnStyle(editor.isActive("italic"))}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bullet List">
          <IconButton
            size="small"
            sx={btnStyle(editor.isActive("bulletList"))}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulletedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <IconButton
            size="small"
            sx={btnStyle(editor.isActive("orderedList"))}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FormatListNumberedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton
            size="small"
            sx={btnStyle(editor.isActive("underline"))}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Link">
          <IconButton
            size="small"
            sx={btnStyle(editor.isActive("link"))}
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
          >
            <LinkIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          p: 2,
          minHeight: 150,
          fontSize: 14,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
          "& .ProseMirror": {
            outline: "none",
            cursor: "text", // ← Add this

            caretColor: "#333", // ← Add this
            color: "#333", // ← Add this
            minHeight: "120px", // ← Add this (or use "auto" / "black")
          },
          "& ul": { pl: 3, listStyleType: "disc" },
          "& ol": { pl: 3, listStyleType: "decimal" },
          "& li": { mb: 0.5, display: "list-item" },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
