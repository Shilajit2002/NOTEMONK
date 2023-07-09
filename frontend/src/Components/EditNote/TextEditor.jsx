// React
import React from "react";

/* ------------- Rich Text Editor ------------- */
// Ract Quill
import ReactQuill from "react-quill";
// React Quil CSS
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  // Modules of Rich Text Editor
  const modules = {
    toolbar: [
      // Existing toolbar options...
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ direction: "rtl" }], // text direction
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ code: "" }],
      ["clean"],
    ],
  };

  // Formats of Rich Text Editor
  const formats = [
    // Existing formats...
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "script",
    "font",
    "size",
    "color",
    "background",
    "list",
    "ordered",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
    "clean",
  ];

  return (
    // React Quill Text Editor
    <ReactQuill
      theme="snow"
      className="noteInput"
      style={{ borderRadius: "0" }}
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextEditor;
