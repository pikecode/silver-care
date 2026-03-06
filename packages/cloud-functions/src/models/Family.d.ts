import { Family as FamilyType } from '@silver-care/shared';
export declare class Family {
    static findById(id: string): Promise<FamilyType | null>;
    static findByUserId(userId: string): Promise<FamilyType[]>;
    static create(data: Partial<FamilyType>): Promise<FamilyType>;
    static addMember(familyId: string, userId: string, role: 'parent' | 'child'): Promise<FamilyType>;
}
