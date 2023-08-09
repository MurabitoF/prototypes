import { useEffect, useState } from "react";
import { type PackageHitType } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { mapPackageData } from "../utils/mapData";
import PackageHit from "./PackageHit";

const Autocomplete: React.FC = () => {
  const [packageName, setPackageName] = useState("");
  const [hits, setHits] = useState<PackageHitType[]>([]);
  const [loading, setLoading] = useState(false);
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
    if (packageName) onSearch(packageName);
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
      <div className="package-hit-container">
        {hits.map((hit: PackageHitType) => (
          <PackageHit key={hit.name} hit={hit} />
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;

