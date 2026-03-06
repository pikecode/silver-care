import { Family, ApiResponse } from '@silver-care/shared';
export declare function generateInviteCode(familyId: string): Promise<ApiResponse<{
    code: string;
}>>;
export declare function joinFamily(userId: string, inviteCode: string): Promise<ApiResponse<Family>>;
export declare function getFamilyMembers(familyId: string): Promise<ApiResponse<Family>>;
