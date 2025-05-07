export class LocalStorageUtils {
  static store<T>(key: string, value: T): void {
    if (['function', 'object'].includes(typeof value)) {
      localStorage[key] = JSON.stringify(value)
    } else {
      localStorage[key] = value
    }

  }

  static get<T=string|null>(key: string, callback?: Function): T {
    if (callback) {
      const value: string = localStorage[key]
      return callback(value)
    }
    return localStorage[key]
  }

  static remove(key: string): string {
    const value: string = localStorage[key]
    localStorage.removeItem(key)
    return value
  }

  static clearAll(): void {
    localStorage.clear()
  }

}