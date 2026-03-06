export class Medication {
    static async findById(id) {
        // 从数据库查询
        return null;
    }
    static async findByUserId(userId) {
        // 查询用户的所有用药提醒
        return [];
    }
    static async create(data) {
        // 创建新用药提醒
        return {
            _id: 'new-med-id',
            userId: data.userId || '',
            name: data.name || '',
            dosage: data.dosage || '',
            frequency: data.frequency || 'daily',
            times: data.times || [],
            notes: data.notes,
            active: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
    static async update(id, data) {
        // 更新用药提醒
        return {
            _id: id,
            userId: data.userId || '',
            name: data.name || '',
            dosage: data.dosage || '',
            frequency: data.frequency || 'daily',
            times: data.times || [],
            notes: data.notes,
            active: data.active !== undefined ? data.active : true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
    static async delete(id) {
        // 删除用药提醒
    }
}
