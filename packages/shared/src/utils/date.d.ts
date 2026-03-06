export declare function isToday(timestamp: number): boolean;
export declare function isYesterday(timestamp: number): boolean;
export declare function isSameDay(timestamp1: number, timestamp2: number): boolean;
export declare function getDayOfWeek(timestamp: number): string;
export declare function getWeekRange(timestamp: number): {
    start: number;
    end: number;
};
export declare function getMonthRange(timestamp: number): {
    start: number;
    end: number;
};
export declare function addDays(timestamp: number, days: number): number;
export declare function addMonths(timestamp: number, months: number): number;
