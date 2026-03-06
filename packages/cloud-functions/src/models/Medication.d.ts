import { Medication as MedicationType } from '@silver-care/shared';
export declare class Medication {
    static findById(id: string): Promise<MedicationType | null>;
    static findByUserId(userId: string): Promise<MedicationType[]>;
    static create(data: Partial<MedicationType>): Promise<MedicationType>;
    static update(id: string, data: Partial<MedicationType>): Promise<MedicationType>;
    static delete(id: string): Promise<void>;
}
