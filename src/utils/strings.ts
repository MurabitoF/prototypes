export function capitalizePackageName(packageName: string) {
    const splitName = packageName.split('-');
    const capitalized = splitName.map(word => {
        return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    return capitalized.join('');
}