// 生成家庭邀请码
export async function generateInviteCode(familyId) {
    try {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        return {
            success: true,
            data: { code },
        };
    }
    catch (error) {
        return {
            success: false,
            error: '生成邀请码失败',
            code: 500,
        };
    }
}
// 加入家庭
export async function joinFamily(userId, inviteCode) {
    try {
        // 验证邀请码
        // 将用户添加到家庭
        return {
            success: true,
            data: {
                _id: 'family-1',
                name: '我的家庭',
                createdBy: 'parent-1',
                members: [
                    { userId: 'parent-1', role: 'parent', joinedAt: Date.now() },
                    { userId, role: 'child', joinedAt: Date.now() },
                ],
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        };
    }
    catch (error) {
        return {
            success: false,
            error: '加入家庭失败',
            code: 500,
        };
    }
}
// 获取家庭成员
export async function getFamilyMembers(familyId) {
    try {
        return {
            success: true,
            data: {
                _id: familyId,
                name: '我的家庭',
                createdBy: 'parent-1',
                members: [
                    { userId: 'parent-1', role: 'parent', joinedAt: Date.now() },
                    { userId: 'child-1', role: 'child', joinedAt: Date.now() },
                ],
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        };
    }
    catch (error) {
        return {
            success: false,
            error: '获取家庭成员失败',
            code: 500,
        };
    }
}
