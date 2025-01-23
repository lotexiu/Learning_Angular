import { LanguageRules } from "../interfaces/machine-language-interfaces";

const MachineLanguages: Record<string, LanguageRules> = {
  'typescript': {
    colors: {
      reservedKeys: 'purple',
      scopeKeys: 'yellow',
      invalid: 'red',
    },
    reservedKeys: [
      'require','import','export',
      'abstract','class','extends','implements',
      'interface','type','namespace','module',
      'from','as','default','function','constructor',
      'this','super','arguments','get','set',
      'private','protected','public','readonly','static',
      'void','any','never','unknown','number','string',
      'boolean','object','symbol','bigint',
      'true','false','null','undefined',
      'let','const','var',
      'if','else','switch','case','for','while',
      'do','in','of',
      'break','continue','return',
      'throw','try','catch','finally',
      'new','delete',
      'typeof','instanceof',
      'async','await','yield','declare','global',
    ],
    scopeKeys: {
      "{": "}",
      "(": ")",
      "[": "]",
      "<": ">",
      "/*": "*/",
    },
    indentifiers: {
      typeObject: {
        identify: '(?<=[\s\S]+){',
        hasScope: true,
      },
      type: {
        identify: '(?<=[\s\S]+)[A-z]\\w*\\s*(<\\s*{type}\\s*>)?){',
        hasScope: true,
      },
      declareType: {
        identify: '(?<=('+
          'class\\s+|'+
          'namespace[ \\t]+|'+
          'interface[ \\t]+|'+
          'type[ \\t]+|'+
          ':\\s*|'+
          'as\\s+|'+
          'instanceof\\s+|'+
          'typeof\\s+|'+
          'new\\s+|'+
          'keyof\\s+'+
        ')){typeObject|type}',
      },
    }
  }
}

export {
  MachineLanguages
}