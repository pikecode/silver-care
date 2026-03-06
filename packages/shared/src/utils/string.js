export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function camelCase(str) {
    return str.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase());
}
export function snakeCase(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
export function kebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
export function truncate(str, length, suffix = '...') {
    return str.length > length ? str.slice(0, length) + suffix : str;
}
export function padStart(str, length, fill = ' ') {
    return str.padStart(length, fill);
}
export function padEnd(str, length, fill = ' ') {
    return str.padEnd(length, fill);
}
