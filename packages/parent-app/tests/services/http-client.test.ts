import { httpPost } from '../../src/services/http-client'

describe('httpPost', () => {
  it('returns response body from wx.request success callback', async () => {
    const request = jest.fn().mockImplementation(({ success }) => {
      success({
        data: {
          success: true,
          data: { token: 't1' },
        },
      })
    })

    ;(global as any).wx = {
      request,
      getStorageSync: jest.fn().mockReturnValue('http://localhost:3000/api/v1'),
    }

    const response = await httpPost<{ token: string }>('/auth/wechat-login', { code: 'wx-code' })

    expect(response).toEqual({ success: true, data: { token: 't1' } })
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/auth/wechat-login',
      })
    )
  })

  it('rejects when wx.request fail callback is called', async () => {
    const request = jest.fn().mockImplementation(({ fail }) => {
      fail(new Error('network error'))
    })

    ;(global as any).wx = {
      request,
      getStorageSync: jest.fn().mockReturnValue('http://localhost:3000/api/v1'),
    }

    await expect(httpPost('/auth/wechat-login', { code: 'wx-code' })).rejects.toThrow('network error')
  })
})
