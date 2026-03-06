export class Family {
    static async findById(id) {
        // 从数据库查询
        return null;
    }
    static async findByUserId(userId) {
        // 查询用户所在的所有家庭
        return [];
    }
    static async create(data) {
        // 创建新家庭
        return {
            _id: 'new-family-id',
            name: data.name || '我的家庭',
            createdBy: data.createdBy || '',
            members: data.members || [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
    static async addMember(familyId, userId, role) {
        // 添加家庭成员
        return {
            _id: familyId,
            name: '我的家庭',
            createdBy: 'parent-1',
            members: [{ userId, role, joinedAt: Date.now() }],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
}
