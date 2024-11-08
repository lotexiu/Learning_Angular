import { Meta, MetaDefinition } from "@angular/platform-browser"
import { LocalStorageUtils } from "./localstorage-utils"

export class themeUtils {

  static initTheme(): void {
    this.setTheme(this.getCurrentTheme())
  }
  
  private static updateTag(newMeta: MetaDefinition): void {
    let meta: Element | null = document.querySelector(`meta[name="${newMeta.name}"]`) || document.querySelector(`meta[property="${newMeta.property}"]`)
    let notFounded: boolean = false
    if (!meta) {
      meta = document.createElement('meta')
      notFounded = true
    }
    for (const key in newMeta){
      meta.setAttribute(key, newMeta[key]);
    }
    if (notFounded){
      document.head.appendChild(meta)
    }
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
    const hex: string = theme == 'dark' ? '#000000' : '#ffffff'
    this.updateTag({ name: 'theme-color', content: hex });
    this.updateTag({ name: 'color-scheme', content: theme });
    document.body.classList.add(theme)
    LocalStorageUtils.store('theme',theme)
    if (theme != currentTheme){
      document.body.classList.remove(currentTheme)
    }
  }
}