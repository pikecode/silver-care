import { z } from 'zod';
export declare function isEmail(email: string): boolean;
export declare function isPhone(phone: string): boolean;
export declare function isIdCard(idCard: string): boolean;
export declare function isUrl(url: string): boolean;
export declare function isStrongPassword(password: string): boolean;
export declare function validateSchema<T>(data: any, schema: z.ZodSchema<T>): {
    valid: boolean;
    errors?: string[];
};
