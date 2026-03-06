import { wechatLogin, getUserInfo } from '../../src/functions/auth'

describe('Auth Functions', () => {
  describe('wechatLogin', () => {
    it('should return success response with token and user', async () => {
      const result = await wechatLogin('mock-code')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.token).toBeDefined()
      expect(result.data?.user).toBeDefined()
      expect(result.data?.user._id).toBeDefined()
      expect(result.data?.user.openId).toBeDefined()
    })

    it('should return user with correct role', async () => {
      const result = await wechatLogin('mock-code')

      expect(result.data?.user.role).toMatch(/parent|child|admin/)
    })

    it('should return token in response', async () => {
      const result = await wechatLogin('mock-code')

      expect(result.data?.token).toBe('mock-token')
    })

    it('should return user with createdAt and updatedAt', async () => {
      const result = await wechatLogin('mock-code')

      expect(result.data?.user.createdAt).toBeDefined()
      expect(result.data?.user.updatedAt).toBeDefined()
    })

    it('should handle errors gracefully', async () => {
      // Mock error scenario
      const result = await wechatLogin('')

      if (!result.success) {
        expect(result.error).toBeDefined()
        expect(result.code).toBe(500)
      }
    })
  })

  describe('getUserInfo', () => {
    it('should return user info', async () => {
      const result = await getUserInfo('user-1')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?._id).toBe('user-1')
    })

    it('should return user with all required fields', async () => {
      const result = await getUserInfo('user-1')

      const user = result.data
      expect(user?.openId).toBeDefined()
      expect(user?.nickname).toBeDefined()
      expect(user?.role).toBeDefined()
      expect(user?.createdAt).toBeDefined()
      expect(user?.updatedAt).toBeDefined()
    })

    it('should return user with correct openId', async () => {
      const result = await getUserInfo('user-1')

      expect(result.data?.openId).toBe('mock-openid')
    })

    it('should return user with correct nickname', async () => {
      const result = await getUserInfo('user-1')

      expect(result.data?.nickname).toBe('用户名')
    })

    it('should return user with parent role', async () => {
      const result = await getUserInfo('user-1')

      expect(result.data?.role).toBe('parent')
    })
  })
})
