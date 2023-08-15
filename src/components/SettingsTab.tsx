import { useEditorStore } from "../state/store";
import { type LayoutType, type ThemeType } from "../types";
import ItemSetting from "./ItemSetting";

const SettingsTab = () => {
  const {
    layout,
    theme,
    fileName,
    inOneFile,
    editorSettings,
    updateLayout,
    updateTheme,
    updateSettings,
    updateFileName,
    updateInOneFile,
  } = useEditorStore();

  return (
    <form>
      <ItemSetting
        id="layout-select"
        label="Editor:"
        title="Layout"
        subtitle="Change the view layout."
      >
        <select
          id="layout-select"
          value={layout}
          onChange={(event) => updateLayout(event.target.value as LayoutType)}
        >
          <option value="default">Default</option>
          <option value="inverted">Inverted</option>
          <option value="columns">4 Columns</option>
          <option value="rows">4 Rows</option>
        </select>
      </ItemSetting>
      <ItemSetting
        id="theme-select"
        label="Workbench:"
        title="Color Theme"
        subtitle="Specifies the color theme used in the workbench."
      >
        <select
          id="theme-select"
          value={theme}
          onChange={(event) => updateTheme(event.target.value as ThemeType)}
        >
          <option value="vs-dark">Dark Theme</option>
          {/* Esta roto ver porque */}
          {/* <option value="light">Light Theme</option> */}
        </select>
      </ItemSetting>
      <ItemSetting
        id="line-number-select"
        label="Editor:"
        title="Line Numbers"
        subtitle="Controls the display of line numbers."
      >
        <select
          id="line-number-select"
          value={editorSettings.lineNumbers?.toString()}
          onChange={(event) =>
            updateSettings("lineNumbers", event.target.value)
          }
        >
          <option value="off">Off</option>
          <option value="on">On</option>
          <option value="relative">Relative</option>
          <option value="interval">Interval</option>
        </select>
      </ItemSetting>
      <ItemSetting
        id="word-wrap-select"
        label="Editor:"
        title="Word Wrap"
        subtitle="Controls how lines should wrap."
      >
        <select
          id="word-wrap-select"
          value={editorSettings.wordWrap}
          onChange={(event) => updateSettings("wordWrap", event.target.value)}
        >
          <option value="off">Off</option>
          <option value="on">On</option>
          <option value="bounded">Bounded</option>
          <option value="wordWrapColumn">Word Wrap Column</option>
        </select>
      </ItemSetting>
      <ItemSetting
        id="font-size-input"
        label="Editor:"
        title="Font Size"
        subtitle="Controls the font size in pixels."
      >
        <input
          id="font-size-input"
          type="number"
          value={editorSettings.fontSize}
          onChange={(event) =>
            updateSettings("fontSize", Number(event.target.value))
          }
        />
      </ItemSetting>
      <ItemSetting
        id="tab-size-input"
        label="Editor:"
        title="Tab Size"
        subtitle="Controls the tab size."
      >
        <input
          id="tab-size-input"
          type="number"
          value={editorSettings.tabSize}
          onChange={(event) =>
            updateSettings("tabSize", Number(event.target.value))
          }
        />
      </ItemSetting>
      <ItemSetting
        id="minimap-checkbox"
        label="Editor:"
        title="Minimap"
        subtitle="Controls whether the minimap is shown."
      >
        <input
          id="minimap-checkbox"
          type="checkbox"
          checked={editorSettings.minimap?.enabled}
          onChange={(event) =>
            updateSettings("minimap", { enabled: event.target.checked })
          }
        />
      </ItemSetting>
      <ItemSetting
        id="font-ligatures-checkbox"
        label="Editor:"
        title="Font Ligatures"
        subtitle="Controls
      whether the ligatures is enabled."
      >
        <input
          id="font-ligatures-checkbox"
          type="checkbox"
          checked={Boolean(editorSettings?.fontLigatures)}
          onChange={(event) =>
            updateSettings("fontLigatures", event.target.checked)
          }
        />
      </ItemSetting>
      <ItemSetting
        id="file-name-input"
        label="Features > Downloads:"
        title="File Name"
        subtitle="Set the zip file name."
      >
        <input
          id="file-name-input"
          type="text"
          value={fileName}
          onChange={(event) => updateFileName(event.target.value)}
        />
      </ItemSetting>
      <ItemSetting
        id="one-file-checkbox"
        label="Features > Download:"
        title="Content"
        subtitle="Controls whether export one
      single zipped HTML file."
      >
        <input
          id="one-file-checkbox"
          type="checkbox"
          checked={inOneFile}
          onChange={(event) => updateInOneFile(event.target.checked)}
        />
      </ItemSetting>
    </form>
  );
};

export default SettingsTab;
