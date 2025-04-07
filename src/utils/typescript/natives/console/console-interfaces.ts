type IConsoleOptions = {
  caller?: boolean;
  callerLevel?: number;
  TimeDifference?: boolean;
  type?: IConsoleType;
}

type IConsoleType = 'log' | 'warn' | 'error';

export {
  IConsoleOptions as ConsoleOptions,
  IConsoleType as ConsoleType,
}