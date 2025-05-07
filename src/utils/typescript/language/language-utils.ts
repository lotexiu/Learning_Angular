import { LanguageFormats } from "./constant/language-formats";

class LanguageUtils {

  NumberFormat(
    language: LanguageFormats, 
    options?: Intl.NumberFormatOptions
  ): Intl.NumberFormat {
    return new Intl.NumberFormat(language, options);
  }
}