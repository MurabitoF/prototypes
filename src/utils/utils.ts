interface BuildHtmlParams {
  html: string;
  css: string;
  js: string;
  head?: string;
}

export function buildHTML({html, css, js, head = ""}: BuildHtmlParams) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${head}
        <style id="preview-style">
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script type="module">
        ${js}
        </script>
      </body>
    </html>`;
}
