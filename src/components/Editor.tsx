import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";
import { useDebounce } from "../hooks/useDebounce";
import { useEditorStore } from "../state/store";
import { type LanguagesType } from "../types";

interface Props {
  language: LanguagesType 
}

const Editor = ({language}: Props) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef(null);
  const suscriptionRef = useRef<monaco.IDisposable>()
  const {editorProps} = useEditorStore((state) => state.editorSettings)
  const editorValue = useEditorStore((state) => state[language])
  const updateContent = useEditorStore((state) => state.updateContent)
  const debouncedOnChange = useDebounce(updateContent, 500)

  useEffect(() => {
    if (editorRef) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(editorRef.current!, {
          value: editorValue,
          language: language,
          automaticLayout: true,
          ...editorProps
        });
      });
    }

    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco);

    return () => editor?.dispose();
  }, [editorRef]);

  useEffect(()=> {
    suscriptionRef.current?.dispose()
    suscriptionRef.current = editor?.onDidChangeModelContent(() => {
      debouncedOnChange(language, editor.getValue())
    })
  })

  return <div style={{ height: "inherit" }} ref={editorRef}></div>;
};

export default Editor;

