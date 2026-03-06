export declare function chunk<T>(array: T[], size: number): T[][];
export declare function unique<T>(array: T[], key?: (item: T) => any): T[];
export declare function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]>;
export declare function sortBy<T>(array: T[], key: (item: T) => any, order?: 'asc' | 'desc'): T[];
export declare function flatten<T>(array: T[][]): T[];
export declare function compact<T>(array: (T | null | undefined)[]): T[];
