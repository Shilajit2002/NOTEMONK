/* ------------- File Logos ------------- */
import MP3 from "./Assets/mp3File.png";
import PNG from "./Assets/pngFIle.png";
import JPG from "./Assets/jpgFile.jpg";
import JPEG from "./Assets/jpegFile.jpg";
import GIF from "./Assets/gif.png";
import PDF from "./Assets/pdf.png";
import DOC from "./Assets/word.png";
import XL from "./Assets/excel.png";
import PPT from "./Assets/ppt.png";
import ZIP from "./Assets/zip.png";
import TXT from "./Assets/txt.png";
import NULL from "./Assets/null.png";
import C from "./Assets/c.png";
import CP from "./Assets/cplusplus.png";
import CS from "./Assets/c#.png";
import JAVA from "./Assets/java.png";
import PY from "./Assets/py.png";
import JS from "./Assets/js.jpeg";
import TS from "./Assets/ts.png";
import JSX from "./Assets/jsx.png";
import SQL from "./Assets/sql.webp";
import HTML from "./Assets/html.png";
import CSS from "./Assets/css.png";
import CSV from "./Assets/csv.webp";

// Image Files Types
const fileTypes = [
    { img: `${MP3}`, mimeType: "audio/mpeg" },
    { img: `${JPG}`, mimeType: "image/jpg" },
    { img: `${JPEG}`, mimeType: "image/jpeg" },
    { img: `${PNG}`, mimeType: "image/png" },
    { img: `${GIF}`, mimeType: "image/gif" },
    { img: `${PDF}`, mimeType: "application/pdf" },
    { img: `${DOC}`, mimeType: "application/msword" },
    { img: `${DOC}`, mimeType: "application/msword" },
    {
        img: `${DOC}`,
        mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { img: `${XL}`, mimeType: "application/vnd.ms-excel" },
    { img: `${XL}`, mimeType: "application/vnd.ms-excel" },
    {
        img: `${XL}`,
        mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    { img: `${PPT}`, mimeType: "application/vnd.ms-powerpoint" },
    { img: `${PPT}`, mimeType: "application/vnd.ms-powerpoint" },
    {
        img: `${PPT}`,
        mimeType:
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
    { img: `${ZIP}`, mimeType: "application/zip" },
    { img: `${ZIP}`, mimeType: "application/x-zip-compressed" },
    { img: `${TXT}`, mimeType: "text/plain" },
    { img: `${JAVA}`, mimeType: "java" },
    { img: `${C}`, mimeType: "c" },
    { img: `${CP}`, mimeType: "cpp" },
    { img: `${PY}`, mimeType: "text/x-python" },
    { img: `${JSX}`, mimeType: "jsx" },
    { img: `${CS}`, mimeType: "cs" },
    { img: `${TS}`, mimeType: "video/vnd.dlna.mpeg-tts" },
    { img: `${JS}`, mimeType: "text/javascript" },
    { img: `${SQL}`, mimeType: "sql" },
    { img: `${HTML}`, mimeType: "text/html" },
    { img: `${CSS}`, mimeType: "text/css" },
    { img: `${CSV}`, mimeType: "text/csv" },
    { img: `${NULL}`, mimeType: "" },
];

// Load Image File Logo as per their Types
const loadImage = (type) => {
    for (let i = 0; i < fileTypes.length; i++) {
        if (fileTypes[i].mimeType === type) {
            return fileTypes[i].img;
        }
    }
    return fileTypes[fileTypes.length - 1].img;
};

//  Truncate File Name Func
const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
        return fileName;
    }

    //  Split the file name with the extension and show the name of the file in a proper way
    const fileExt = fileName.split(".").pop();
    const fileNameWithoutExt = fileName.substring(
        0,
        fileName.length - fileExt.length - 1
    );
    const truncatedName = `${fileNameWithoutExt.substring(
        0,
        Math.floor(maxLength / 2)
    )}...${fileNameWithoutExt.substring(
        fileNameWithoutExt.length - Math.ceil(maxLength / 2)
    )}`;

    return `${truncatedName}.${fileExt}`;
};

export { loadImage, truncateFileName };