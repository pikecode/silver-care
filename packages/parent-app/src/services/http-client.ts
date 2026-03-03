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

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/v1'

function getApiBaseUrl(): string {
  const stored = (wx as any).getStorageSync('apiBaseUrl')
  if (typeof stored === 'string' && stored.length > 0) {
    return stored
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
      success: (res: any) => resolve(res.data as ApiResponse<T>),
      fail: (err: any) => reject(err),
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
