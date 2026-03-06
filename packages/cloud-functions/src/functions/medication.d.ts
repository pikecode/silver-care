import { Medication, MedicationCheckin, ApiResponse } from '@silver-care/shared';
export declare function createMedication(data: {
    userId: string;
    name: string;
    dosage: string;
    frequency: 'daily' | 'weekly' | 'custom';
    times: string[];
    notes?: string;
}): Promise<ApiResponse<Medication>>;
export declare function getMedications(userId: string): Promise<ApiResponse<Medication[]>>;
export declare function checkInMedication(medicationId: string, userId: string): Promise<ApiResponse<MedicationCheckin>>;
export declare function getMedicationCheckins(userId: string, date: string): Promise<ApiResponse<MedicationCheckin[]>>;
export declare function updateMedication(medicationId: string, data: Partial<Medication>): Promise<ApiResponse<Medication>>;
export declare function deleteMedication(medicationId: string): Promise<ApiResponse<{
    success: boolean;
}>>;
