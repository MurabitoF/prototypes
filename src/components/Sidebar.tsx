import { useMemo, useState } from "react";
import Tooltip from "rc-tooltip";
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

const TAB_RENDER_COMPONENT = {
  editor: null,
  packages: <Autocomplete />,
  options: <SettingsTab />,
};

const Sidebar = () => {
  const [tabSelected, setTabSelected] = useState<TabSelectedType>("editor");
  const html = useEditorStore((state) => state.html);
  const css = useEditorStore((state) => state.css);
  const js = useEditorStore((state) => state.javascript);

  function handleClick(tab: TabSelectedType) {
    if (tabSelected === tab) {
      setTabSelected("editor");
      return;
    }
    setTabSelected(tab);
  }

  const url = useMemo(() => {
    const blob = new Blob([buildHTML({ html, css, js })], {
      type: "text/html",
    });
    const url = URL.createObjectURL(blob);

    return url;
  }, [html, css, js])

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
        <Tooltip
          placement="right"
          overlay={<span>Open the preview on a new tab</span>}
        >
          <a
            className="icon-button"
            style={{ textAlign: "center" }}
            href={url}
            target="_blank"
          >
            <PreviewIcon width={32} height={32} color="#FFF" />
          </a>
        </Tooltip>

        <IconButton
          onClick={() => zipProject({ html, css, js })}
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
