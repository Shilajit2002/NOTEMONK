// React & UseState
import React, { useState } from "react";
// Copy Icon
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CodeFile = ({ base64String }) => {
  // Copy UseState
  const [copy, setCopy] = useState(false);

  let textContent = "";
  try {
    const decodedContent = atob(base64String); // Decode the base64 content
    textContent = decodeURIComponent(escape(decodedContent));
  } catch (error) {
    textContent = "No Preview Available.Please Download It ~";
  }

  //   Handle Copy Func
  const handleCopy = (textContent) => {
    const textToCopy = textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      })
      .catch((error) => {
        // console.error("Error copying text:", error);
        setCopy(false);
      });
  };

  return (
    // Pre Tag
    <pre
      style={{
        backgroundColor: "#282828",
        color: "#7EDCF1",
        padding: "10px",
        borderRadius: "5px",
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      }}
    >
      {/* Inner Code Text */}
      {textContent}
      {/* Before Copy Show Copy Icon */}
      {!copy ? (
        <ContentCopyIcon
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => {
            handleCopy(textContent);
          }}
        />
      ) : (
        // After Copy Show Copied Text
        <p
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "black",
            cursor: "pointer",
            backgroundColor: "lightsteelblue",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          COPIED
        </p>
      )}
    </pre>
  );
};

export default CodeFile;
