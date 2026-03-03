import { AuthService } from '../../src/services/auth'

describe('AuthService.login (children-app)', () => {
  it('uses HTTP endpoint instead of cloud function', async () => {
    const request = jest.fn().mockImplementation(({ success }) => {
      success({
        data: {
          success: true,
          data: {
            token: 'token-child',
            user: {
              _id: 'u2',
              openId: 'o2',
              nickname: 'n2',
              role: 'child',
              createdAt: 1,
              updatedAt: 1,
            },
          },
        },
      })
    })

    ;(global as any).wx = {
      request,
      getStorageSync: jest.fn().mockReturnValue('http://localhost:3000/api/v1'),
      setStorageSync: jest.fn(),
      removeStorageSync: jest.fn(),
    }

    const service = new AuthService()
    const user = await service.login('mock-code')

    expect(user._id).toBe('u2')
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/auth/wechat-login',
        data: { code: 'mock-code' },
      })
    )
  })

  it('throws when API response indicates failure', async () => {
    const request = jest.fn().mockImplementation(({ success }) => {
      success({ data: { success: false, error: 'login failed' } })
    })

    ;(global as any).wx = {
      request,
      getStorageSync: jest.fn().mockReturnValue('http://localhost:3000/api/v1'),
      setStorageSync: jest.fn(),
      removeStorageSync: jest.fn(),
    }

    const service = new AuthService()

    await expect(service.login('bad-code')).rejects.toThrow('login failed')
  })
})
