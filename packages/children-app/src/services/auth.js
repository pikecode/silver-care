export class AuthService {
    constructor() {
        this.token = null;
        this.user = null;
    }
    async login(code) {
        try {
            const response = await this.callCloudFunction('wechatLogin', { code });
            if (response.success) {
                this.token = response.data.token;
                this.user = response.data.user;
                wx.setStorageSync('token', this.token);
                wx.setStorageSync('user', JSON.stringify(this.user));
                return this.user;
            }
            throw new Error(response.error);
        }
        catch (error) {
            throw error;
        }
    }
    async logout() {
        this.token = null;
        this.user = null;
        wx.removeStorageSync('token');
        wx.removeStorageSync('user');
    }
    getUser() {
        return this.user;
    }
    getToken() {
        return this.token;
    }
    isLoggedIn() {
        return this.token !== null && this.user !== null;
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
export const authService = new AuthService();
