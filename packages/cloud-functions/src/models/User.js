export class User {
    static async findById(id) {
        // 从数据库查询
        return null;
    }
    static async findByOpenId(openId) {
        // 从数据库查询
        return null;
    }
    static async create(data) {
        // 创建新用户
        return {
            _id: 'new-id',
            openId: data.openId || '',
            nickname: data.nickname || '',
            role: data.role || 'parent',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
    static async update(id, data) {
        // 更新用户
        return {
            _id: id,
            openId: data.openId || '',
            nickname: data.nickname || '',
            role: data.role || 'parent',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
}
