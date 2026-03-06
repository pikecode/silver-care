export declare class AppError extends Error {
    code: string;
    message: string;
    statusCode: number;
    details?: any | undefined;
    constructor(code: string, message: string, statusCode?: number, details?: any | undefined);
}
