export function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
export function unique(array, key) {
    if (!key)
        return [...new Set(array)];
    const seen = new Set();
    return array.filter(item => {
        const k = key(item);
        if (seen.has(k))
            return false;
        seen.add(k);
        return true;
    });
}
export function groupBy(array, key) {
    return array.reduce((result, item) => {
        const k = key(item);
        if (!result[k])
            result[k] = [];
        result[k].push(item);
        return result;
    }, {});
}
export function sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = key(a);
        const bVal = key(b);
        if (aVal < bVal)
            return order === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return order === 'asc' ? 1 : -1;
        return 0;
    });
}
export function flatten(array) {
    return array.reduce((result, item) => result.concat(item), []);
}
export function compact(array) {
    return array.filter((item) => item != null);
}
