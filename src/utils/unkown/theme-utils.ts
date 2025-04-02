import { LocalStorageUtils } from "./localStorage-utils"

export class themeUtils {

  static initTheme(): void {
    this.setTheme(this.getCurrentTheme())
  }
  
  static getDefaultTheme(): string {
    const preferredTheme: 'dark'|'light' = (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches ?
        'dark': 'light'
    )
    return preferredTheme
  }

  static getCurrentTheme(): string {
    let theme: string | null = LocalStorageUtils.get('theme')
    if (!theme) {
      theme = this.getDefaultTheme()
      this.setTheme(theme)
    }
    return theme
  }

  static setTheme(theme: 'dark'|'light'|string): void {
    const currentTheme: string = LocalStorageUtils.get('theme')!
    LocalStorageUtils.store('theme',theme)
    document.body.classList.add(theme)
    if (theme != currentTheme){
      document.body.classList.remove(currentTheme)
    }
  }
}