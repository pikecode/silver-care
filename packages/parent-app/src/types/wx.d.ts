declare namespace wx {
  interface CloudCallFunctionOptions {
    name: string
    data?: any
    success?: (res: any) => void
    fail?: (err: any) => void
    complete?: (res: any) => void
  }

  interface Cloud {
    callFunction(options: CloudCallFunctionOptions): Promise<any>
  }

  interface StorageOptions {
    key: string
    data?: any
    success?: (res: any) => void
    fail?: (err: any) => void
    complete?: (res: any) => void
  }

  interface NavigateToOptions {
    url: string
    success?: (res: any) => void
    fail?: (err: any) => void
    complete?: (res: any) => void
  }

  interface ShowToastOptions {
    title: string
    icon?: 'success' | 'error' | 'loading' | 'none'
    duration?: number
    mask?: boolean
    success?: (res: any) => void
    fail?: (err: any) => void
    complete?: (res: any) => void
  }

  const cloud: Cloud
  function setStorageSync(key: string, data: any): void
  function getStorageSync(key: string): any
  function removeStorageSync(key: string): void
  function setStorage(options: StorageOptions): void
  function getStorage(options: StorageOptions): void
  function removeStorage(options: StorageOptions): void
  function navigateTo(options: NavigateToOptions): void
  function showToast(options: ShowToastOptions): void
}

declare const wx: typeof wx
