import { useEffect, useState } from "react";
import { type PackageHit } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { mapPackageData } from "../utils/mapData";
import { useEditorStore } from "../state/store";
import { capitalizePackageName } from "../utils/strings";

const Autocomplete: React.FC = () => {
  const [packageName, setPackageName] = useState("");
  const [hits, setHits] = useState<PackageHit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedPackageName = useDebounce(setPackageName, 300);

  const onSearch = (inputValue: string) => {
    setLoading(true);

    fetch(`https://api.npms.io/v2/search/suggestions?q=${inputValue}`)
      .then((response) => response.json())
      .then((rawData) => mapPackageData(rawData))
      .then((mappedData) => setHits(mappedData))
      .catch((error) => {
        console.error("Error fetching NPM packages:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if(packageName)
      onSearch(packageName);
  }, [packageName]);

  return (
    <div>
      <p style={{ marginTop: 0 }}>
        <strong style={{ display: "block" }}>JavaScript: Add dependency</strong>
        An import statement will be added to the top of the JavaScript editor
        for the package.
      </p>
      <input
        type="text"
        className="sidebar-tab--input"
        onChange={(event) => debouncedPackageName(event.target.value)}
        placeholder="Search NPM packages"
      />
      {loading && <div>Loading...</div>}
      <div>
        {hits.map((hit: PackageHit) => (
          <PackageHit key={hit.name} hit={hit} />
        ))}
      </div>
    </div>
  );
};

const SKYPACK_BASE_URL = "https://cdn.skypack.dev";

const PackageHit: React.FC<{ hit: PackageHit }> = ({ hit }) => {
  const javascript = useEditorStore((state) => state.javascript);
  const updateLastCDNImport = useEditorStore((state) => state.updateLastCDNImport);

  function handleClick() {
    const url = `${SKYPACK_BASE_URL}/${hit.name}`
    const newJavascript = `import ${capitalizePackageName(hit.name)} from '${url}'\n${javascript}`
    updateLastCDNImport(newJavascript)
  }

  return (
    <div onClick={handleClick}>
      <h2>{hit.name}</h2>
      <p>{hit.description}</p>
      <small>Version: {hit.version}</small>
    </div>
  );
};

export default Autocomplete;
