import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces"

const LANGUAGE_FORMATS = {
  //! Árabe (Egito)
  'ar-EG':{
  },
  //! Tcheco (República Tcheca)
  'cs-CZ':{
  },
  //! Dinamarquês (Dinamarca)
  'da-DK':{
  },
  //! Alemão (Alemanha)
  'de-DE':{
  },
  //! Grego (Grécia)
  'el-GR':{
  },
  //! Inglês (Reino Unido)
  'en-GB':{
  },
  //! Inglês (Estados Unidos)
  'en-US':{
  },
  //! Espanhol (Espanha)
  'es-ES':{
  },
  //! Finlandês (Finlândia)
  'fi-FI':{
  },
  //! Francês (França)
  'fr-FR':{
  },
  //! Hebraico (Israel)
  'he-IL':{
  },
  //! Hindi (Índia)
  'hi-IN':{
  },
  //! Húngaro (Hungria)
  'hu-HU':{
  },
  //! Indonésio (Indonésia)
  'id-ID':{
  },
  //! Italiano (Itália)
  'it-IT':{
  },
  //! Japonês (Japão)
  'ja-JP':,
  //! Coreano (Coreia)
  'ko-KR':{
  },
  //! Holandês (Holanda)
  'nl-NL':{
  },
  //! Norueguês (Noruega)
  'no-NO':{
  },
  //! Polonês (Polônia)
  'pl-PL':{
  },
  //! Português (Brasil)
  'pt-BR':{
  },
  //! Português (Portugal)
  'pt-PT':{
  },
  //! Romeno (Romênia)
  'ro-RO':{
  },
  //! Russo (Rússia)
  'ru-RU':{
  },
  //! Sueco (Suécia)
  'sv-SE':{
  },
  //! Tailandês (Tailândia)
  'th-TH':{
  },
  //! Turco (Turquia)
  'tr-TR':{
  },
  //! Vietnamita (Vietnã)
  'vi-VN':{
  },
  //! Chinês (China)
  'zh-CN':{
  },
}

type ILanguageFormats = KeyOf<typeof LANGUAGE_FORMATS>

export {
  LANGUAGE_FORMATS,
  ILanguageFormats as LanguageFormats,
}