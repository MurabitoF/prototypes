import { editor } from "monaco-editor";
import { capitalizePackageName } from "../utils/strings";
import { type PackageHitType } from "../types";

const CDN_BASE_URL = "https://esm.sh";

const PackageHit: React.FC<{ hit: PackageHitType }> = ({ hit }) => {
  function handleClick() {
    const jsEditor = editor
      .getEditors()
      .find((e) => e.getModel()?.getLanguageId() === "javascript");
    if (!jsEditor) return;

    const text = `import ${capitalizePackageName(hit.name)} from '${CDN_BASE_URL}/${hit.name}'\n`;
    jsEditor.executeEdits("add-package", [
      { range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }, text },
    ]);
    jsEditor.focus();
  }

  return (
    <button type="button" className="package-hit" onClick={handleClick}>
      <h2>{hit.name}</h2>
      <p>{hit.description}</p>
      <small>Version: {hit.version}</small>
    </button>
  );
};

export default PackageHit;
