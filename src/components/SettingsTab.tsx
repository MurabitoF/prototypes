import { useEditorStore } from "../state/store";
import { type LayoutType, type ThemeType } from "../types";

const SettingsTab = () => {
  const layout = useEditorStore((state) => state.layout);
  const theme = useEditorStore((state) => state.theme);
  const updateLayout = useEditorStore((state) => state.updateLayout);
  const updateTheme = useEditorStore((state) => state.updateTheme);

  return (
    <article>
      <section>
        <strong>
          <span>Editor:</span>
          Layout
        </strong>
        Change the view layout
        <div>
          <label htmlFor="layout-select"></label>
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
        </div>
      </section>

      <section>
        <strong>
          <span>Workbench:</span>
          Color Theme
        </strong>
        Specifies the color theme used in the workbench.
        <div>
          <label htmlFor="theme-select" />
          <select
            id="theme-select"
            value={theme}
            onChange={(event) => updateTheme(event.target.value as ThemeType)}
          >
            <option value="vs-dark">Dark Theme</option>
            <option value="light">Light Theme</option>
          </select>
        </div>
      </section>
    </article>
  );
};

export default SettingsTab;
