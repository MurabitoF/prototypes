import { ReactNode, useState } from "react";
import Autocomplete from "./Autocomplete";
import SidebarTab from "./SidebarTab";
import IconButton from "./IconButton";
import {
  DownloadIcon,
  EditorIcon,
  LinkIcon,
  PackagesIcon,
  PreviewIcon,
  SettingsIcon,
} from "./Icons";
import { zipProject } from "../utils/zipFile";
import { useEditorStore } from "../state/store";
import { buildHTML } from "../utils/utils";
import SettingsTab from "./SettingsTab";
import { encodeCode } from "../utils/share";

type TabSelectedType = "editor" | "packages" | "options";

const TAB_RENDER_COMPONENT: Record<string, ReactNode> = {
  editor: null,
  packages: <Autocomplete />,
  options: <SettingsTab />,
};

const Sidebar = () => {
  const [tabSelected, setTabSelected] = useState<TabSelectedType>("editor");
  const [linkCopied, setLinkCopied] = useState(false);

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

  async function copyShareLink() {
    const { html, css, javascript } = useEditorStore.getState();
    const code = await encodeCode({ html, css, javascript });
    await navigator.clipboard.writeText(`${location.origin}${location.pathname}#code=${code}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function downloadZip() {
    const { html, css, javascript: js, fileName, inOneFile } = useEditorStore.getState();
    zipProject({ html, css, js, zipFileName: fileName, zipInSingleFile: inOneFile });
  }

  return (
    <nav className="sidebar-container">
      <span className="logo">Pty</span>

      <div className="sidebar-group">
        <IconButton
          onClick={() => handleClick("editor")}
          label="Editor"
          isSelected={tabSelected === "editor"}
        >
          <EditorIcon width={32} height={32} />
        </IconButton>

        <IconButton
          onClick={() => handleClick("packages")}
          label="NPM Packages"
          isSelected={tabSelected === "packages"}
        >
          <PackagesIcon width={32} height={32} />
        </IconButton>
      </div>

      <div className="sidebar-group sidebar-group--bottom">
        <IconButton
          onClick={copyShareLink}
          label={linkCopied ? "Link copied!" : "Copy a share link"}
        >
          <LinkIcon width={32} height={32} />
        </IconButton>
        <IconButton onClick={openPreview} label="Open the preview on a new tab">
          <PreviewIcon width={32} height={32} />
        </IconButton>

        <IconButton
          onClick={downloadZip}
          label="Download the code in a zip file"
        >
          <DownloadIcon width={32} height={32} />
        </IconButton>
        <IconButton
          onClick={() => handleClick("options")}
          label="Editor Settings"
          isSelected={tabSelected === "options"}
        >
          <SettingsIcon width={32} height={32} />
        </IconButton>
      </div>

      <SidebarTab>{TAB_RENDER_COMPONENT[tabSelected]}</SidebarTab>
    </nav>
  );
};

export default Sidebar;
