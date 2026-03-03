import { Medication, MedicationCheckin } from '@silver-care/shared';
export declare class MedicationService {
    createMedication(data: {
        name: string;
        dosage: string;
        frequency: 'daily' | 'weekly' | 'custom';
        times: string[];
        notes?: string;
    }): Promise<Medication>;
    getMedications(userId: string): Promise<Medication[]>;
    checkInMedication(medicationId: string, userId: string): Promise<MedicationCheckin>;
    getMedicationCheckins(userId: string, date: string): Promise<MedicationCheckin[]>;
    updateMedication(medicationId: string, data: Partial<Medication>): Promise<Medication>;
    deleteMedication(medicationId: string): Promise<void>;
    private callCloudFunction;
}
export declare const medicationService: MedicationService;
