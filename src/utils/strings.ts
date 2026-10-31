export function capitalizePackageName(packageName: string) {
  return packageName
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join("");
}
