import { z } from 'zod';
export declare const UserLoginSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
export declare const UserProfileSchema: z.ZodObject<{
    name: z.ZodString;
    age: z.ZodNumber;
    phone: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    age: number;
    address?: string | undefined;
}, {
    name: string;
    phone: string;
    age: number;
    address?: string | undefined;
}>;
export declare const FamilyInviteSchema: z.ZodObject<{
    inviteCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    inviteCode: string;
}, {
    inviteCode: string;
}>;
