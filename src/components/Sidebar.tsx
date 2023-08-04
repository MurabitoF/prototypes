import { useState } from "react";
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

type TabSelectedType = "editor" | "packages" | "options";

const TAB_RENDER_COMPONENT = {
  editor: null,
  packages: <Autocomplete />,
  options: "make editor option tab",
};

const Sidebar = () => {
  const [tabSelected, setTabSelected] = useState<TabSelectedType>("editor");
  const html = useEditorStore((state) => state.html);
  const css = useEditorStore((state) => state.css);
  const javascript = useEditorStore((state) => state.javascript);

  function handleClick(tab: TabSelectedType) {
    if (tabSelected === tab) {
      setTabSelected("editor");
      return;
    }
    setTabSelected(tab);
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
        <IconButton onClick={() => {}} label="Open the preview on a new tab">
          <PreviewIcon width={32} height={32} color="#FFF" />
        </IconButton>
        <IconButton
          onClick={() => zipProject({html, css, js: javascript})}
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
