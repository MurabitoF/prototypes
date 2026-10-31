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

  useEffect(() => {
    if (!packageName) {
      setHits([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);

    fetch(
      `https://api.npms.io/v2/search/suggestions?q=${encodeURIComponent(packageName)}`,
      { signal: controller.signal }
    )
      .then((response) => response.json())
      .then((rawData) => setHits(mapPackageData(rawData)))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching NPM packages:", error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [packageName]);

  return (
    <div>
      <p style={{ marginTop: 0 }}>
        <strong style={{ display: "block" }}>JavaScript: Add dependency</strong>
        An import statement will be added to the top of the JavaScript editor
        for the package.
      </p>
      <input
        type="search"
        aria-label="Search NPM packages"
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

