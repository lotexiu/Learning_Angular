function functionsDetails(func: Function) {
  const details: any = {
    name: func.name,
    totalMandatoryArgs: func.length,
    args: getArgs(func),
    returnType: "Unkown",
  };
  return details;
}

function getArgs(func: Function): string[] {
  return func.toString()
    .replace(/[\s\S]*(?<!\([\s\S]*)\(|(?<!\)[\s\S]*)\)[\s\S]*/g, '')
    .split(',').map((arg: string): string => arg.trim())
    .filter((arg: string): boolean => arg.length > 0);
}

export const _Function = {
  functionsDetails,
  getArgs,
}