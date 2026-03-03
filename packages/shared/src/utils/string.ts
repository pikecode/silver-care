export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelCase(str: string): string {
  return str.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase())
}

export function snakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function kebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function truncate(str: string, length: number, suffix: string = '...'): string {
  return str.length > length ? str.slice(0, length) + suffix : str
}

export function padStart(str: string, length: number, fill: string = ' '): string {
  return str.padStart(length, fill)
}

export function padEnd(str: string, length: number, fill: string = ' '): string {
  return str.padEnd(length, fill)
}
