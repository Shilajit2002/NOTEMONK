// DocViewer
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// XLSX
import * as XLSX from "xlsx";
// Code File Component
import CodeFile from "./CodeFile";

// A chunk size
const CHUNK_SIZE = 8192;

// Convert File Array Buffer to Base 64
const arrayBufferToBase64 = (buffer) => {
    const chunks = [];
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
        chunks.push(
            String.fromCharCode.apply(null, bytes.slice(i, i + CHUNK_SIZE))
        );
    }
    return btoa(chunks.join(""));
};

// Show File Func
const showFile = (buffer, contentType, ext) => {
    const base64String = arrayBufferToBase64(buffer);
    const url = `data:${contentType};base64,${base64String}`;
    // This is for XL file
    if (
        ext === "xlsx" ||
        ext === "xls" ||
        ext === "xlsm" ||
        ext === "xlsb" ||
        ext === "csv"
    ) {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        return (
            // Table for XL File
            <div>
                {/* Table */}
                <table
                    className="table table-hover table-bordered table-striped table-dark"
                    style={{
                        boxSadow:
                            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                    }}
                >
                    {/* Tbody */}
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    // This is for DOC & PPT file
    else if (
        ext === "doc" ||
        ext === "docx" ||
        ext === "docm" ||
        ext === "dot" ||
        ext === "dotx" ||
        ext === "dotm" ||
        ext === "ppt" ||
        ext === "pptx" ||
        ext === "pptm" ||
        ext === "pot" ||
        ext === "potx" ||
        ext === "potm" ||
        ext === "pps" ||
        ext === "ppsx" ||
        ext === "ppsm"
    ) {
        return <p style={{
            backgroundColor: "#282828",
            color: "#7EDCF1",
            padding: "10px",
            borderRadius: "5px",
            letterSpacing: '2px',
            boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}>
            "No Preview Available.Please Download It ~"
        </p>;
    }
    // This is for Image Files
    else if (contentType.includes("image/")) {
        return (
            <img
                src={url}
                alt=""
                style={{
                    boxSadow:
                        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                }}
            />
        );
    }
    // This is for PDF Files
    else if (contentType.includes("application/pdf")) {
        const docs = [
            { uri: url }, // Remote file
        ];

        return (
            // PDF Docviewer
            <div>
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            </div>
        );
    }
    // This is for Audio Files
    else if (contentType.includes("audio/")) {
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
            }}>
                <audio controls>
                    <source src={url} type={contentType} />
                </audio>
            </div>
        );
    }
    // This is for Video Files
    else if (contentType.includes("video/") && contentType !== "video/vnd.dlna.mpeg-tts") {
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
            }}>
                <video width="100%"
                    controls>
                    <source src={url} type={contentType} />
                </video>
            </div>
        );
    }
    // This is for Coding Files
    else {
        return <CodeFile base64String={base64String} />;
    }
};

// Download File FUnc
const downloadFile = (fileName, buffer, contentType) => {
    const base64String = arrayBufferToBase64(buffer);
    const url = `data:${contentType};base64,${base64String}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
};

export { showFile, downloadFile };