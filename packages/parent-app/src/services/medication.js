export class MedicationService {
    async createMedication(data) {
        const response = await this.callCloudFunction('createMedication', data);
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error);
    }
    async getMedications(userId) {
        const response = await this.callCloudFunction('getMedications', { userId });
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error);
    }
    async checkInMedication(medicationId, userId) {
        const response = await this.callCloudFunction('checkInMedication', { medicationId, userId });
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error);
    }
    async getMedicationCheckins(userId, date) {
        const response = await this.callCloudFunction('getMedicationCheckins', { userId, date });
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error);
    }
    async updateMedication(medicationId, data) {
        const response = await this.callCloudFunction('updateMedication', { medicationId, ...data });
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error);
    }
    async deleteMedication(medicationId) {
        const response = await this.callCloudFunction('deleteMedication', { medicationId });
        if (!response.success) {
            throw new Error(response.error);
        }
    }
    async callCloudFunction(name, data) {
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name,
                data,
                success: (res) => resolve(res.result),
                fail: (err) => reject(err),
            });
        });
    }
}
export const medicationService = new MedicationService();
