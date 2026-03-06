import { z } from 'zod';
export declare const BloodPressureSchema: z.ZodObject<{
    systolic: z.ZodNumber;
    diastolic: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    systolic: number;
    diastolic: number;
}, {
    systolic: number;
    diastolic: number;
}>;
export declare const BloodSugarSchema: z.ZodNumber;
export declare const MedicationSchema: z.ZodObject<{
    name: z.ZodString;
    dosage: z.ZodString;
    frequency: z.ZodEnum<["daily", "weekly", "custom"]>;
    times: z.ZodArray<z.ZodString, "many">;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    dosage: string;
    frequency: "daily" | "weekly" | "custom";
    times: string[];
    notes?: string | undefined;
}, {
    name: string;
    dosage: string;
    frequency: "daily" | "weekly" | "custom";
    times: string[];
    notes?: string | undefined;
}>;
export declare const HealthRecordSchema: z.ZodObject<{
    type: z.ZodEnum<["blood_pressure", "blood_sugar"]>;
    value: z.ZodUnion<[z.ZodObject<{
        systolic: z.ZodNumber;
        diastolic: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        systolic: number;
        diastolic: number;
    }, {
        systolic: number;
        diastolic: number;
    }>, z.ZodNumber]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: number | {
        systolic: number;
        diastolic: number;
    };
    type: "blood_pressure" | "blood_sugar";
    notes?: string | undefined;
}, {
    value: number | {
        systolic: number;
        diastolic: number;
    };
    type: "blood_pressure" | "blood_sugar";
    notes?: string | undefined;
}>;
