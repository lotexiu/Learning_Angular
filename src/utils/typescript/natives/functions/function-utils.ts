class FunctionUtils {

  static functionsDetails(func: Function) {
    const details: any = {
      name: func.name,
      totalMandatoryArgs: func.length,
      args: FunctionUtils.getArgs(func),
      returnType: "Unkown",
    };
    return details;
  }


  static getArgs(func: Function): string[] {
    return func.toString()
      .replace(/[\s\S]*(?<!\([\s\S]*)\(|(?<!\)[\s\S]*)\)[\s\S]*/g, '')
      .split(',').map((arg: string): string => arg.trim());
  }
}

export {
  FunctionUtils
}