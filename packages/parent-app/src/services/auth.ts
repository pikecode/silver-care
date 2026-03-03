import { httpPost } from './http-client'

interface User {
  _id: string
  openId: string
  nickname: string
  role: 'parent' | 'child' | 'admin'
  createdAt: number
  updatedAt: number
}

interface WechatLoginResponse {
  token: string
  user: User
}

export class AuthService {
  private token: string | null = null
  private user: User | null = null

  async login(code: string): Promise<User> {
    const response = await httpPost<WechatLoginResponse>('/auth/wechat-login', { code })
    if (!response.success || !response.data) {
      throw new Error(response.error || 'login failed')
    }

    this.token = response.data.token
    this.user = response.data.user
    ;(wx as any).setStorageSync('token', this.token)
    ;(wx as any).setStorageSync('user', JSON.stringify(this.user))

    return this.user
  }

  async logout(): Promise<void> {
    this.token = null
    this.user = null
    ;(wx as any).removeStorageSync('token')
    ;(wx as any).removeStorageSync('user')
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
}

export const authService = new AuthService()
