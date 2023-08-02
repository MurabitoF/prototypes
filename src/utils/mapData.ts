import { type PackageRawData, type PackageHit } from "../types";

export function mapPackageData(packages: PackageRawData[]): PackageHit[] {
    console.log('mapper');
    return packages.map( rawData => ({
        name: rawData.package.name,
        description: rawData.package.description,
        version: rawData.package.version
    }))
}