import { max } from "rxjs"
import { cLog, isNull } from "src/utils/easy-use"
import { maskKeys } from "./constants/mask-keys"


interface MaskValue {
  amount: number
  maxAmount: number
  optional: boolean
}

interface MaskKeyValue<T> extends MaskValue {
  value: string
  set: (
    value?: string,
    amount?: number,
    maxAmount?: number,
    optional?: boolean,
  ) => MaskBuilderValue<T>
}

class MaskBuilderValue<T> implements MaskValue{
  key: MaskKeyValue<T> = {
    value: '',
    amount: 1,
    maxAmount: 1,
    optional: false,
    set:(
      value: string = '',
      amount: number = 1,
      maxAmount: number = 1,
      optional: boolean = false,
    ) => {
      this.key = {
        value,
        amount,
        maxAmount,
        optional,
        set: this.key.set
      }
      return this
    }
  }

  amount: number = 1
  maxAmount: number = 1
  optional: boolean = false
  lookType: '<!'|'<='|'=>'|'!>'|'' = ''

  leftValues: MaskBuilderValue<this>[] = []
  rightValues: MaskBuilderValue<this>[] = []

  parent!: T

  new(
    side: 'left' | 'right',
    matchAmount: number = 1,
    maxAmount: number = 1,
    optional: boolean = false,
  ){
    const group = new MaskBuilderValue<this>()
    group.amount = matchAmount
    group.maxAmount = maxAmount
    group.optional = optional
    group.parent = this
    this[`${side}Values`].push(group)
    return group
  }

  look(lookType: typeof this.lookType) {
    this.lookType = lookType
    return this
  }

  private bulidAmount(value: any): string {
    let mask: string = '';
    if (value.amount > 1 || value.amount >= 0 && value.maxAmount > 1) {
      mask += `{${value.amount}`
      if (value.maxAmount > 1) {
        if (value.maxAmount == Infinity) {
          mask += ','
        } else {
          mask += `,${value.maxAmount}`
        }
      }
      mask += '}';
    }
    return mask;
  }

  private buildDetail(value: any) {
    if (value.optional) {
      return '?';
    }
    return ''
  }
  

  build(withMask: boolean = false) {
    if (this.key.value.startsWith('\\') && !withMask){
      return ''
    }
    const keyMask = `${this.key.value}${this.bulidAmount(this.key)}`
    const leftMask: string = this.leftValues.map(
      (value: MaskBuilderValue<this>): string => value.build(withMask)).join('')
    const rightMask: string = this.rightValues.map(
      (value: MaskBuilderValue<this>): string => value.build(withMask)).join('')
    let mask: string = ''

    const thisAmount: string = this.bulidAmount(this)
    const thisDetails: string = this.buildDetail(this)
    const keyDetails: string = this.buildDetail(this.key);

    if (this.parent instanceof MaskBuilder) {
      // mask += `(<!${keyMask})`
      // mask += '^'
    }
    mask += isNull(this.lookType,'') ? '' : `(${this.lookType}`
    mask += isNull(thisDetails,'') ? '' : '('
    mask += isNull(thisAmount,'') ? '' : `(`
    mask += isNull(keyDetails,'') ? '' : '('
    mask += `${leftMask}${keyMask}${rightMask}`
    mask += isNull(keyDetails,'') ? '' : `)${keyDetails}` 
    mask += isNull(thisAmount,'') ? '' : `)${thisAmount}`
    mask += isNull(thisDetails,'') ? '' : `)${thisDetails}`
    mask += isNull(this.lookType,'') ? '' : `)`
    return mask
  }

  regex(): string {
    if (this.key.value.startsWith('\\')){
      return ''
    }

    // (?<!\d{1,3})\d{1,3}(?!.$|(?<=\.\d{1,2}))
    // (?<!\d{1,3})\d{1,3}(?!\d$|(?<=\.\d{1,2}))
    
    // (?<!\d{1,3})\d{1,3}(?![^.])
    // console.log(this.build())

    const reservedRegexKeys: string[] = ['.']
    let regex: string = '';

    // replace

    // let escapedChar: boolean = false;
    // [...this.build()].forEach((char)=>{
    //   if (Object.hasOwn(maskKeys, char)) {
    //   } else {
    //     regex += char
    //   }
    // })

    // for (const key  in maskKeys) {
    //   const escapedKey: string = reservedRegexKeys.includes(key) ? `\\${key}` : key
    //   const regexPattern = new RegExp(`(?<!\\\\)(?:${escapedKey})(?![^{]*})`, 'g');
    //   regex = regex.replace(regexPattern, maskKeys[key as keyof typeof maskKeys])
    // }
    return regex
  }
}

class MaskBuilder {
  values: MaskBuilderValue<this>[] = []

  new(
    matchAmount: number = 1,
    maxAmount: number = 1,
    optional: boolean = false,
  ){
    const group = new MaskBuilderValue<this>()
    group.amount = matchAmount
    group.maxAmount = maxAmount
    group.optional = optional
    group.parent = this
    this.values.push(group)
    return group
  }
  
  
  build(withMask: boolean = false): string {
    let mask = ''
    this.values.forEach((value: MaskBuilderValue<this>, idx: number): void => {
      mask += `${idx?'|':''}${value.build(withMask)}`
    })
    return mask
  }

  regex() {
    let regStr = ''
    this.values.forEach((value: MaskBuilderValue<this>, idx: number): void => {
      regStr += `${idx?'|':''}${value.regex()}`
    })
    return regStr
  }

  log(): any {
    cLog('Building Mask')
    let results: any[] = [
      this,
      this.build(true),
      // this.regex()
    ]
    cLog({TimeDifference:true}, ...results)
  }
}

export {
  MaskBuilder
}