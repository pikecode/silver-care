export declare function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
export declare function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export declare function merge<T>(target: T, source: Partial<T>): T;
export declare function deepClone<T>(obj: T): T;
export declare function isEmpty(obj: any): boolean;
