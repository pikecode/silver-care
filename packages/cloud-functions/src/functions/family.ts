import { Family, ApiResponse } from '@silver-care/shared'

const DEPRECATION_MESSAGE = 'This cloud function has been deprecated. Please use the REST API instead: POST /api/v1/family/*'

// 生成家庭邀请码
export async function generateInviteCode(familyId: string): Promise<ApiResponse<{ code: string }>> {
  return {
    success: false,
    error: DEPRECATION_MESSAGE,
    code: 410,
  }
}

// 加入家庭
export async function joinFamily(userId: string, inviteCode: string): Promise<ApiResponse<Family>> {
  return {
    success: false,
    error: DEPRECATION_MESSAGE,
    code: 410,
  }
}

// 获取家庭成员
export async function getFamilyMembers(familyId: string): Promise<ApiResponse<Family>> {
  return {
    success: false,
    error: DEPRECATION_MESSAGE,
    code: 410,
  }
}

