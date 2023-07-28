import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

const Editor = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(editorRef.current!, {
          value: "// Write your code here",
          language: "javascript",
          minimap: {
            enabled: false,
          },
          theme: "vs-dark",
          fontFamily: "Cascadia Code, monospace",
          fontLigatures: true,
          automaticLayout: true,
        });
      });
    }

    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco);

    return () => editor?.dispose();
  }, [editorRef]);

  return <div style={{ height: "inherit" }} ref={editorRef}></div>;
};

export default Editor;

