import { editor } from "monaco-editor";

export type LayoutType = "default" | "inverted" | "columns";
export type LanguagesType = "html" | "css" | "javascript";

export interface Store {
  html: string;
  css: string;
  javascript: string;
  editorSettings: Partial<editor.IStandaloneEditorConstructionOptions>;
  layout: LayoutType;
}

export type Actions = {
  updateContent: (lang: LanguagesType, text: string) => void;
  updateLayout: (layout: LayoutType) => void;
  updateSettings: (key, value) => void;
};
