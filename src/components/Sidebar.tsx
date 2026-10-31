import { ReactNode, useState } from "react";
import Autocomplete from "./Autocomplete";
import SidebarTab from "./SidebarTab";
import IconButton from "./IconButton";
import {
  DownloadIcon,
  EditorIcon,
  PackagesIcon,
  PreviewIcon,
  SettingsIcon,
} from "./Icons";
import { zipProject } from "../utils/zipFile";
import { useEditorStore } from "../state/store";
import { buildHTML } from "../utils/utils";
import SettingsTab from "./SettingsTab";

type TabSelectedType = "editor" | "packages" | "options";

const TAB_RENDER_COMPONENT: Record<string, ReactNode> = {
  editor: null,
  packages: <Autocomplete />,
  options: <SettingsTab />,
};

const Sidebar = () => {
  const [tabSelected, setTabSelected] = useState<TabSelectedType>("editor");

  function handleClick(tab: TabSelectedType) {
    if (tabSelected === tab) {
      setTabSelected("editor");
      return;
    }
    setTabSelected(tab);
  }

  function openPreview() {
    const { html, css, javascript: js } = useEditorStore.getState();
    const blob = new Blob([buildHTML({ html, css, js })], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }

  function downloadZip() {
    const { html, css, javascript: js, fileName, inOneFile } = useEditorStore.getState();
    zipProject({ html, css, js, zipFileName: fileName, zipInSingleFile: inOneFile });
  }

  return (
    <section
      className="sidebar-container bg-dark"
      style={{ overflow: "visible" }}
    >
      <span className="logo">Pty</span>

      <div
        style={{
          width: "100%",
          height: "50%",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <IconButton
          onClick={() => handleClick("editor")}
          label="Editor"
          isSelected={tabSelected === "editor"}
        >
          <EditorIcon width={32} height={32} color="#FFF" />
        </IconButton>

        <IconButton
          onClick={() => handleClick("packages")}
          label="NPM Packages"
          isSelected={tabSelected === "packages"}
        >
          <PackagesIcon width={32} height={32} color="#FFF" />
        </IconButton>
      </div>

      <div
        style={{
          width: "100%",
          height: "50%",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 50,
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={openPreview} label="Open the preview on a new tab">
          <PreviewIcon width={32} height={32} color="#FFF" />
        </IconButton>

        <IconButton
          onClick={downloadZip}
          label="Download the code in a zip file"
        >
          <DownloadIcon width={32} height={32} color="#FFF" />
        </IconButton>
        <IconButton
          onClick={() => handleClick("options")}
          label="Editor Settings"
          isSelected={tabSelected === "options"}
        >
          <SettingsIcon width={32} height={32} color="#FFF" />
        </IconButton>
      </div>

      <SidebarTab>{TAB_RENDER_COMPONENT[tabSelected]}</SidebarTab>
    </section>
  );
};

export default Sidebar;
