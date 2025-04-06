export class LocalStorageUtils {
  static store(key: string, value: string): void {
    localStorage[key] = value
  }

  static get(key: string): string | null {
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