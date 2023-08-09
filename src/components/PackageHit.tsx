import { useEditorStore } from "../state/store";
import { capitalizePackageName } from "../utils/strings";
import { type PackageHitType } from "../types";

const SKYPACK_BASE_URL = "https://cdn.skypack.dev";

const PackageHit: React.FC<{ hit: PackageHitType }> = ({ hit }) => {
  const javascript = useEditorStore((state) => state.javascript);
  const updateLastCDNImport = useEditorStore(
    (state) => state.updateLastCDNImport
  );

  function handleClick() {
    const url = `${SKYPACK_BASE_URL}/${hit.name}`;
    const newJavascript = `import ${capitalizePackageName(
      hit.name
    )} from '${url}'\n${javascript}`;
    updateLastCDNImport(newJavascript);
  }

  return (
    <div className="package-hit" onClick={handleClick}>
      <h2>{hit.name}</h2>
      <p>{hit.description}</p>
      <small>Version: {hit.version}</small>
    </div>
  );
};

export default PackageHit;

