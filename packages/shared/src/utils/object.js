export function pick(obj, keys) {
    const result = {};
    keys.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}
export function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}
export function merge(target, source) {
    return { ...target, ...source };
}
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const cloned = {};
        for (const key in obj) {
            cloned[key] = deepClone(obj[key]);
        }
        return cloned;
    }
    return obj;
}
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
