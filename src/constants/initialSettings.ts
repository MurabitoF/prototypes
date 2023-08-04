import {editor} from "monaco-editor/";
import { type Store } from "../types";

const DEFAULT_EDITOR_SETTINGS: editor.IStandaloneEditorConstructionOptions =
  {
    fontFamily: "Cascadia Code, monospace",
    fontLigatures: true,
    lineNumbers: "off",
    tabSize: 2,
    minimap: {
      enabled: false,
    },
    wordWrap: "on"
  };

export const DEFAULT_INITIAL_SETTINGS: Store = {
  editorSettings: DEFAULT_EDITOR_SETTINGS,
  layout: "default",
  html: "<!-- Write your html here... -->\n",
  css: "/* Write your css here... */\n",
  javascript: "// Write your javascript code here...\n",
  lastCDNImport: ''
};
