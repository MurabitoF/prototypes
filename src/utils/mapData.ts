import { type PackageRawData, type PackageHitType } from "../types";

export function mapPackageData(packages: PackageRawData[]): PackageHitType[] {
    console.log('mapper');
    return packages.map( rawData => ({
        name: rawData.package.name,
        description: rawData.package.description,
        version: rawData.package.version
    }))
}