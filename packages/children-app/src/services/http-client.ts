type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
  path: string
  method: HttpMethod
  data?: unknown
  token?: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

interface WxStorageResult {
  data: string
  errMsg: string
}

interface WxRequestSuccessResult<T> {
  data: T
  statusCode: number
  header: Record<string, string>
  errMsg: string
}

// 环境配置：优先级 storage > 环境变量 > 默认值
const DEFAULT_API_BASE_URL = process.env.API_BASE_URL || 'https://api.silver-care.com/api/v1'

function getApiBaseUrl(): string {
  try {
    const result = (wx as any).getStorageSync('apiBaseUrl') as string
    if (typeof result === 'string' && result.length > 0) {
      return result
    }
  } catch (error) {
    console.warn('Failed to read apiBaseUrl from storage:', error)
  }
  return DEFAULT_API_BASE_URL
}

function request<T>({ path, method, data, token }: RequestOptions): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    ;(wx as any).request({
      url: `${getApiBaseUrl()}${path}`,
      method,
      data,
      header: token ? { Authorization: `Bearer ${token}` } : undefined,
      success: (res: WxRequestSuccessResult<ApiResponse<T>>) => {
        resolve(res.data)
      },
      fail: (err: { errMsg: string }) => {
        reject(new Error(err.errMsg || 'Network request failed'))
      },
    })
  })
}

export function httpPost<T>(path: string, data: unknown, token?: string): Promise<ApiResponse<T>> {
  return request<T>({
    path,
    method: 'POST',
    data,
    token,
  })
}
