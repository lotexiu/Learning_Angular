import { Class } from "@ts-natives/class/model/class";
import { DeepPartial } from "@ts-natives/object/interfaces/object-interfaces";
import { RegexPattern } from "@ts-natives/regex/constants/regex-patterns";

class MaskFunction extends Class{
  args: string[] = [];
  func?: Function

  constructor(data?: DeepPartial<MaskFunction>) {
    super();
    this.assign(data as DeepPartial<this>);
  }
}

class MaskParameter extends Class {
  parameter: string = '';
  valueType: string = '';
  defaultValue: any;
  optional: boolean = false;

  constructor(data?: DeepPartial<MaskParameter>) {
    super();
    this.assign(data as DeepPartial<this>);
  }
}

class MaskKey extends Class {
  key: string = '';
  reserved: boolean = false;
  parameters: MaskParameter[] = [];
  regex!: RegexPattern|MaskFunction|string

  constructor(data?: DeepPartial<MaskKey>) {
    super();
    this.assign(data as DeepPartial<this>);
  }
}

export {
  MaskKey,
  MaskParameter,
  MaskFunction
}