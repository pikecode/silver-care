import { AppError } from './AppError';
export declare class ValidationError extends AppError {
    constructor(message: string, details?: any);
}
