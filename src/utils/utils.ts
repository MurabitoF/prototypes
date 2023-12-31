interface BuildHtmlParams {
  html: string;
  css: string;
  js: string;
}

export function buildHTML({html, css, js}: BuildHtmlParams) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
