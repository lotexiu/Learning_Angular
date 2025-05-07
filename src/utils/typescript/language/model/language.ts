import { LanguageFormats } from "../constant/language-formats";

class Language {
  constructor(language: LanguageFormats) {
    this.language = language;
  }

  private _language: LanguageFormats = 'en-US';
  public get language(): LanguageFormats {
    return this.language;
  }
  public set language(value: LanguageFormats) {
    this.language = value;
  }

  NumberFormat(options?: Intl.NumberFormatOptions): Intl.NumberFormat {
    return new Intl.NumberFormat(this.language, options);
  }
}