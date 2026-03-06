import { User, ApiResponse } from '@silver-care/shared'

export class AuthService {
  private token: string | null = null
  private user: User | null = null

  async login(code: string): Promise<User> {
    try {
      // 调用云函数登录
      const response = await this.callCloudFunction('wechatLogin', { code })
      if (response.success) {
        this.token = response.data.token
        this.user = response.data.user
        // 保存到本地存储
        wx.setStorageSync('token', this.token)
        wx.setStorageSync('user', JSON.stringify(this.user))
        return this.user!
      }
      throw new Error(response.error)
    } catch (error) {
      throw error
    }
  }

  async logout(): Promise<void> {
    this.token = null
    this.user = null
    wx.removeStorageSync('token')
    wx.removeStorageSync('user')
  }

  getUser(): User | null {
    return this.user
  }

  getToken(): string | null {
    return this.token
  }

  isLoggedIn(): boolean {
    return this.token !== null && this.user !== null
  }

  private async callCloudFunction(name: string, data: any): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name,
        data,
        success: (res: any) => resolve(res.result),
        fail: (err: any) => reject(err),
      })
    })
  }
}

export const authService = new AuthService()
