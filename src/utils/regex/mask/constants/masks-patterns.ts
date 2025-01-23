import { LockedParams } from "src/utils/interfaces/interfaces"

type MaskPatterns =
  |'TEXT'
  |'PHONE'
  |'CPF'
  |'CNPJ'
  |'CEP'
  |'EMAIL'
  |'DATE'
  |'TIME'
  |'DATETIME'
  |'NUMBER'
  |'NUMBER_DECIMAL'
  |'NUMBER_DECIMAL_DOT'
  |'PERCENTAGE'
  |'PERCENTAGE_DECIMAL'
  |'PERCENTAGE_DECIMAL_DOT'

const maskPatterns: LockedParams<MaskPatterns, string> =  {
  TEXT:
    'X*',
  PHONE:
    '+0{2} (0{2}) 0{4}-0{4}||' +
    '(0{2}) 0{5}-0{4}||' +
    '(0{2}) 0{4}-0{4}||' +
    '0{4}-0{4}',
  // CPF_CNPJ:

  CPF:
    '0{3}\\.0{3}\\.0{3}-0{2}||'+
    '0{3}\\.0{3}\\.0{3}-||'+
    '0{3}\\.0{3}\\.||'+
    '0{3}\\.',
  CNPJ:
    '0{2}\\.0{3}\\.0{3}/0{4}-0{2}||'+
    '0{2}\\.0{3}\\.0{3}/0{4}-||'+
    '0{2}\\.0{3}\\.0{3}/||'+
    '0{2}\\.0{3}\\.||'+
    '0{2}\\.',
  CEP:
    '0{5}-0{3}||'+
    '0{5}-',
  EMAIL:
    'A*@A*.A*',
  DATE:
    '0{2}/0{2}/0{4}||'+
    '0{2}/0{2}/||'+
    '0{2}/',
  TIME:
    '0{2}:0{2}||'+
    '0{2}:',
  DATETIME:
    '0{2}/0{2}/0{4} 0{2}:0{2}||'+
    '0{2}/0{2}/0{4} 0{2}:||'+
    '0{2}/0{2}/0{4} ||'+
    '0{2}/0{2}/||'+
    '0{2}/||',
  NUMBER:
    '0*',
  NUMBER_DECIMAL:
    '0*||'+
    '0*,00*',
  NUMBER_DECIMAL_DOT:
    '0*||'+
    '0*.00*',
  PERCENTAGE:
    '0*%',
  PERCENTAGE_DECIMAL:
    '0*||'+
    '0*,00*%',
  PERCENTAGE_DECIMAL_DOT:
    '0*||'+
    '0*.00*%',
}

export {
  MaskPatterns,
  maskPatterns
}