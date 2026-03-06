// 微信登录
export async function wechatLogin(code) {
    try {
        // 调用微信 API 获取 openId
        // 查询或创建用户
        // 生成 token
        return {
            success: true,
            data: {
                token: 'mock-token',
                user: {
                    _id: 'user-1',
                    openId: 'mock-openid',
                    nickname: '用户名',
                    role: 'parent',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
            },
        };
    }
    catch (error) {
        return {
            success: false,
            error: '登录失败',
            code: 500,
        };
    }
}
// 获取用户信息
export async function getUserInfo(userId) {
    try {
        // 从数据库查询用户
        return {
            success: true,
            data: {
                _id: userId,
                openId: 'mock-openid',
                nickname: '用户名',
                role: 'parent',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        };
    }
    catch (error) {
        return {
            success: false,
            error: '获取用户信息失败',
            code: 500,
        };
    }
}
