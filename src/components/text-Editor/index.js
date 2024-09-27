"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { FaBold, FaItalic, FaLink, FaImage, FaFileAlt } from "react-icons/fa";

const RichTextEditor = ({
  content,
  setContent,
  handleImageUpload,
  handleFileUpload,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content: content || "<p></p>",
  });

  useEffect(() => {
    if (editor) {
      setContent(editor.getHTML());
    }
  }, [editor?.getHTML()]);

  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <button
          type="button"
          onClick={() => editor && editor.chain().focus().toggleBold().run()}
          className={`p-2 ${
            editor && editor.isActive("bold") ? "bg-blue-500" : "bg-gray-200"
          } hover:bg-gray-300 rounded`}
          disabled={!editor}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor && editor.chain().focus().toggleItalic().run()}
          className={`p-2 ${
            editor && editor.isActive("italic") ? "bg-blue-500" : "bg-gray-200"
          } hover:bg-gray-300 rounded`}
          disabled={!editor}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter the URL:");
            if (url && editor)
              editor.chain().focus().setLink({ href: url }).run();
          }}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
          disabled={!editor}
        >
          <FaLink />
        </button>
        <button
          type="button"
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) handleImageUpload(file);
            };
            input.click();
          }}
        >
          <FaImage />
        </button>
        <button
          type="button"
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".pdf,.doc,.docx";
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload(file);
            };
            input.click();
          }}
        >
          <FaFileAlt />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border p-4 min-h-[200px] rounded-md shadow-sm"
      />
    </div>
  );
};

export default RichTextEditor;
