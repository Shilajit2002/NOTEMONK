/* ------------- File Logos ------------- */
// Song
import MP3 from "./Assets/mp3File.png";
// Video
import VID from "./Assets/vid.png";
// Images
import PNG from "./Assets/pngFIle.png";
import JPG from "./Assets/jpgFile.jpg";
import JPEG from "./Assets/jpegFile.jpg";
import GIF from "./Assets/gif.png";
import TIFF from "./Assets/tiff.png";
import SVG from "./Assets/svg.png";
import ICO from "./Assets/ico.png";
import PSD from "./Assets/psd.png";
import BMP from "./Assets/bmp.avif";
// PDF
import PDF from "./Assets/pdf.png";
// DOC
import DOC from "./Assets/word.png";
// XL
import XL from "./Assets/excel.png";
// CSV
import CSV from "./Assets/csv.webp";
// PPT
import PPT from "./Assets/ppt.png";
// ZIP
import ZIP from "./Assets/zip.png";
// TEXT
import TXT from "./Assets/txt.png";
// Programming Files
import C from "./Assets/c.png";
import CP from "./Assets/cplusplus.png";
import CS from "./Assets/cs.png";
import JAVA from "./Assets/java.png";
import PY from "./Assets/py.png";
import JS from "./Assets/js.jpeg";
import TS from "./Assets/ts.png";
import JSX from "./Assets/jsx.png";
import SQL from "./Assets/sql.webp";
import HTML from "./Assets/html.png";
import CSS from "./Assets/css.png";
// ENV
import ENV from "./Assets/env.png";
// Git
import GIT from "./Assets/git.png";
// MD
import MD from "./Assets/md.png";
// JSON
import JSON from "./Assets/json.jpg";
// BSON
import BSON from "./Assets/bson.png";
// DB
import DB from "./Assets/db.png";
// Null File
import NULL from "./Assets/null.png";

// Image Files Types
const fileTypes = [
    // Song
    { img: `${MP3}`, mimeType: "mp3" },
    { img: `${MP3}`, mimeType: "wav" },
    { img: `${MP3}`, mimeType: "flac" },
    // Video
    { img: `${VID}`, mimeType: "mp4" },
    { img: `${VID}`, mimeType: "avi" },
    { img: `${VID}`, mimeType: "mov" },
    { img: `${VID}`, mimeType: "wmv" },
    { img: `${VID}`, mimeType: "mkv" },
    { img: `${VID}`, mimeType: "mpeg" },
    { img: `${VID}`, mimeType: "mpg" },
    { img: `${VID}`, mimeType: "f4v" },
    { img: `${VID}`, mimeType: "swf" },
    { img: `${VID}`, mimeType: "webp" },
    { img: `${VID}`, mimeType: "3gp" },
    { img: `${VID}`, mimeType: "flv" },
    { img: `${VID}`, mimeType: "m2ts" },
    // Images
    { img: `${JPG}`, mimeType: "jpg" },
    { img: `${JPEG}`, mimeType: "jpeg" },
    { img: `${PNG}`, mimeType: "png" },
    { img: `${GIF}`, mimeType: "gif" },
    { img: `${TIFF}`, mimeType: "tiff" },
    { img: `${TIFF}`, mimeType: "tif" },
    { img: `${SVG}`, mimeType: "svg" },
    { img: `${BMP}`, mimeType: "bmp" },
    { img: `${PSD}`, mimeType: "psd" },
    { img: `${ICO}`, mimeType: "ico" },
    { img: `${ICO}`, mimeType: "icon" },
    // PDF
    { img: `${PDF}`, mimeType: "pdf" },
    // DOC
    { img: `${DOC}`, mimeType: "docx" },
    { img: `${DOC}`, mimeType: "doc" },
    { img: `${DOC}`, mimeType: "docm" },
    { img: `${DOC}`, mimeType: "dot" },
    { img: `${DOC}`, mimeType: "dotx" },
    { img: `${DOC}`, mimeType: "dotm" },
    // XL
    { img: `${XL}`, mimeType: "xlsx" },
    { img: `${XL}`, mimeType: "xls" },
    { img: `${XL}`, mimeType: "xlsm" },
    { img: `${XL}`, mimeType: "xlsb" },
    // CSV
    { img: `${CSV}`, mimeType: "csv" },
    // PPT
    { img: `${PPT}`, mimeType: "ppt" },
    { img: `${PPT}`, mimeType: "pptx" },
    { img: `${PPT}`, mimeType: "pptm" },
    { img: `${PPT}`, mimeType: "pot" },
    { img: `${PPT}`, mimeType: "potx" },
    { img: `${PPT}`, mimeType: "potm" },
    { img: `${PPT}`, mimeType: "pps" },
    { img: `${PPT}`, mimeType: "ppsx" },
    { img: `${PPT}`, mimeType: "ppsm" },
    // ZIP
    { img: `${ZIP}`, mimeType: "zip" },
    { img: `${ZIP}`, mimeType: "zipx" },
    { img: `${ZIP}`, mimeType: "7z" },
    { img: `${ZIP}`, mimeType: "rar" },
    { img: `${ZIP}`, mimeType: "gz" },
    { img: `${ZIP}`, mimeType: "tar" },
    { img: `${ZIP}`, mimeType: "bz2" },
    { img: `${ZIP}`, mimeType: "xz" },
    { img: `${ZIP}`, mimeType: "lha" },
    { img: `${ZIP}`, mimeType: "lzh" },
    // TEXT
    { img: `${TXT}`, mimeType: "txt" },
    // Programming Files
    { img: `${JAVA}`, mimeType: "java" },
    { img: `${C}`, mimeType: "c" },
    { img: `${CP}`, mimeType: "cpp" },
    { img: `${PY}`, mimeType: "py" },
    { img: `${JSX}`, mimeType: "jsx" },
    { img: `${CS}`, mimeType: "cs" },
    { img: `${TS}`, mimeType: "ts" },
    { img: `${JS}`, mimeType: "js" },
    { img: `${SQL}`, mimeType: "sql" },
    { img: `${HTML}`, mimeType: "html" },
    { img: `${CSS}`, mimeType: "css" },
    // ENV
    { img: `${ENV}`, mimeType: "env" },
    // GIT
    { img: `${GIT}`, mimeType: "git" },
    { img: `${GIT}`, mimeType: "gitignore" },
    // MD
    { img: `${MD}`, mimeType: "md" },
    // JSON
    { img: `${JSON}`, mimeType: "json" },
    // BSON
    { img: `${BSON}`, mimeType: "bson" },
    // DB
    { img: `${DB}`, mimeType: "db" },
    // Null File
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