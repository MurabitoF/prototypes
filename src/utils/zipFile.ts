import JSZip from "jszip";
import { buildHTML } from "./utils";

interface ZipProjectParams {
  html: string;
  css: string;
  js: string;
  zipFileName?: string;
  zipInSingleFile?: boolean;
}

interface Params {
  html: string;
  css: string;
  js: string;
}

const DEFAULT_ZIP_FILE_NAME = "prototypes";

export async function zipProject({
  html,
  css,
  js,
  zipFileName = DEFAULT_ZIP_FILE_NAME,
  zipInSingleFile = false,
}: ZipProjectParams) {
  zipFileName = zipFileName === "" ? DEFAULT_ZIP_FILE_NAME : zipFileName;

  const createZip = zipInSingleFile
    ? createZipWithSingleFile
    : createZipWithMultipleFiles;

  const zip = createZip({ html, css, js });
  return generateZip({ zip, zipFileName });
}

function createZipWithSingleFile({ html, css, js }: Params) {
  const zip = new JSZip();
  const indexHTML = buildHTML({ css, html, js });

  zip.file("index.html", indexHTML);

  return zip;
}

function createZipWithMultipleFiles({ html, css, js }: Params) {
  const zip = new JSZip();

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link type="text/css" rel="stylesheet" href="style.css"/>
  </head>
  <body>
    ${html}
    <script type="module" src="script.js"></script>
  </body>
</html>`;

  zip.file("style.css", css);
  zip.file("script.js", js);
  zip.file("index.html", indexHtml);

  return zip;
}

function generateZip({
  zip,
  zipFileName,
}: {
  zip: JSZip;
  zipFileName: string;
}) {
  return zip.generateAsync({ type: "blob" }).then((blobData: BlobPart) => {
    const zipBlob = new window.Blob([blobData]);
    const element = window.document.createElement("a");

    element.href = window.URL.createObjectURL(zipBlob);
    element.download = `${zipFileName}.zip`;
    element.click();
  });
}
