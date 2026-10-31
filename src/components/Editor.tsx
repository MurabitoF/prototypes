import { type Monaco } from "@monaco-editor/react/dist/index";
import { type LanguagesType } from "../types";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useDebounce } from "../hooks/useDebounce";
import { useEditorStore } from "../state/store";
import { Allotment } from "allotment";

interface Props {
  language: LanguagesType;
}

const Editor: React.FC<Props> = ({ language }) => {
  const editorProps = useEditorStore((state) => state.editorSettings);
  const theme = useEditorStore((state) => state.theme);
  const editorValue = useEditorStore((state) => state[language]);
  const updateContent = useEditorStore((state) => state.updateContent);
  const debouncedOnChange = useDebounce(updateContent, 500);

  function handleEditorWillMount(monaco: Monaco) {
    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco);
  }

  return (
    <Allotment
      vertical
      separator={false}
      className={theme === "light" ? "bg-medium-light" : "bg-medium"}
    >
      <Allotment.Pane minSize={20} maxSize={20}>
        <div className="flex-container">
          <div>{language.toLocaleUpperCase()}</div>
        </div>
      </Allotment.Pane>
      <Allotment.Pane>
        <MonacoEditor
          defaultLanguage={language}
          defaultValue={editorValue}
          beforeMount={handleEditorWillMount}
          onChange={(value) => debouncedOnChange(language, value ?? "")}
          theme={theme}
          options={{ ...editorProps }}
        />
      </Allotment.Pane>
    </Allotment>
  );
};

export default Editor;
