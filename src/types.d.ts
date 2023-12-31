import { editor } from "monaco-editor";

export type LayoutType = "default" | "inverted" | "columns" | "rows";
export type LanguagesType = "html" | "css" | "javascript";
export type ThemeType = "light" | "vs-dark"
export interface Store {
  html: string;
  css: string;
  javascript: string;
  editorSettings: Partial<editor.IStandaloneEditorConstructionOptions>;
  layout: LayoutType;
  lastCDNImport?: string;
  theme: ThemeType;
  fileName: string;
  inOneFile: boolean;
}

export type Actions = {
  updateContent: (lang: LanguagesType, text: string) => void;
  updateLayout: (layout: LayoutType) => void;
  updateTheme: (theme: ThemeType) => void;
  updateSettings: (key, value) => void;
  updateLastCDNImport: (link: string) => void;
  updateFileName: (newFileName: string) => void;
  updateInOneFile: (value: boolean) => void
};

export interface PackageRawData {
  package: {
    name: string;
    scope: string;
    version: string;
    description: string;
    date: string;
    links: {
      npm: string;
      homepage: string;
      repository: string;
      bugs: string;
    };
    author?: {
      name: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    maintainers: [
      {
        username: string;
        email: string;
      }
    ];
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
  highlight: string;
}

export interface PackageHitType {
  name: string;
  description: string;
  version: string;
}
